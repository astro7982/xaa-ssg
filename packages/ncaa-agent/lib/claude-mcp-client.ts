import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

interface MCPTool {
  name: string;
  description: string;
  input_schema: any;
}

class ClaudeMCPClient {
  private client: Anthropic;
  private mcpClient: Client | null = null;
  private transport: StdioClientTransport | null = null;
  private tools: MCPTool[] = [];
  private isInitialized = false;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async initialize() {
    if (this.isInitialized) return;

    console.log('🚀 Initializing MCP Server connection...');

    const mcpServerPath = process.env.MCP_SERVER_PATH ||
      '/Users/johnc/Documents/xaa-ssg/packages/ncaa-mcp-server/dist/server.js';

    try {
      // Create MCP client
      this.mcpClient = new Client(
        {
          name: 'ncaa-agent-client',
          version: '1.0.0',
        },
        {
          capabilities: {},
        }
      );

      // Create transport
      this.transport = new StdioClientTransport({
        command: 'node',
        args: [mcpServerPath],
      });

      // Connect
      await this.mcpClient.connect(this.transport);

      // Get available tools
      const toolsResponse = await this.mcpClient.listTools();

      this.tools = toolsResponse.tools.map(tool => ({
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
      }));

      this.isInitialized = true;
      console.log('✅ MCP Server connected');
      console.log(`📋 Available tools: ${this.tools.map(t => t.name).join(', ')}`);
    } catch (error) {
      console.error('❌ Failed to initialize MCP client:', error);
      throw error;
    }
  }

  private async callMCPTool(toolName: string, toolInput: any): Promise<any> {
    if (!this.mcpClient) {
      throw new Error('MCP client not initialized');
    }

    try {
      const result = await this.mcpClient.callTool({
        name: toolName,
        arguments: toolInput,
      });

      // Extract text content
      if (result.content && result.content.length > 0) {
        const textContent = result.content.find((c: any) => c.type === 'text');
        if (textContent) {
          return JSON.parse(textContent.text);
        }
      }

      return result;
    } catch (error) {
      console.error(`❌ Error calling MCP tool ${toolName}:`, error);
      throw error;
    }
  }

  async chat(message: string, history: Array<{ role: string; content: string }> = []): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    console.log('💬 User message:', message);
    console.log('📜 Using conversation history:', history.length, 'messages');

    try {
      // Build messages array with history
      const messages = [
        ...history.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        {
          role: 'user' as const,
          content: message,
        },
      ];

      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2048,
        tools: this.tools.map(tool => ({
          name: tool.name,
          description: tool.description,
          input_schema: tool.input_schema,
        })),
        messages,
      });

      console.log('🤖 Claude stop_reason:', response.stop_reason);

      // Handle tool use
      if (response.stop_reason === 'tool_use') {
        // Get ALL tool use blocks (Claude can call multiple tools at once)
        const toolUseBlocks = response.content.filter(
          (block): block is Anthropic.Messages.ToolUseBlock =>
            block.type === 'tool_use'
        );

        if (toolUseBlocks.length > 0) {
          console.log(`🔧 Claude wants to use ${toolUseBlocks.length} tool(s)`);

          // Call all MCP tools in parallel
          const toolResults = await Promise.all(
            toolUseBlocks.map(async (toolUseBlock) => {
              console.log(`🔧 Calling tool: ${toolUseBlock.name}`);
              console.log(`📦 Tool input:`, toolUseBlock.input);

              try {
                const result = await this.callMCPTool(
                  toolUseBlock.name,
                  toolUseBlock.input
                );
                console.log(`✅ Tool ${toolUseBlock.name} completed`);
                return {
                  type: 'tool_result' as const,
                  tool_use_id: toolUseBlock.id,
                  content: JSON.stringify(result),
                };
              } catch (error) {
                console.error(`❌ Tool ${toolUseBlock.name} failed:`, error);
                return {
                  type: 'tool_result' as const,
                  tool_use_id: toolUseBlock.id,
                  content: JSON.stringify({ error: String(error) }),
                  is_error: true,
                };
              }
            })
          );

          // Send all tool results back to Claude with history
          const followUpResponse = await this.client.messages.create({
            model: 'claude-sonnet-4-5-20250929',
            max_tokens: 2048,
            tools: this.tools.map(tool => ({
              name: tool.name,
              description: tool.description,
              input_schema: tool.input_schema,
            })),
            messages: [
              ...messages, // Include all previous messages
              {
                role: 'assistant',
                content: response.content,
              },
              {
                role: 'user',
                content: toolResults,
              },
            ],
          });

          // Extract text response
          const textBlock = followUpResponse.content.find(
            (block): block is Anthropic.Messages.TextBlock =>
              block.type === 'text'
          );

          return textBlock?.text || 'I received the data but had trouble formatting a response.';
        }
      }

      // No tool use, return direct text response
      const textBlock = response.content.find(
        (block): block is Anthropic.Messages.TextBlock =>
          block.type === 'text'
      );

      return textBlock?.text || 'I apologize, but I had trouble processing your request.';

    } catch (error) {
      console.error('❌ Error in Claude chat:', error);
      throw error;
    }
  }

  async cleanup() {
    if (this.mcpClient) {
      await this.mcpClient.close();
      this.mcpClient = null;
    }
    this.transport = null;
    this.isInitialized = false;
  }
}

// Export singleton instance
let claudeClient: ClaudeMCPClient | null = null;

export function getClaudeClient(): ClaudeMCPClient {
  if (!claudeClient) {
    claudeClient = new ClaudeMCPClient();
  }
  return claudeClient;
}
