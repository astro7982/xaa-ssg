import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ncaaTools, executeNCAAool } from './tools/ncaa-tools.js';

const server = new Server(
  {
    name: 'ncaa-stats-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.error('📋 Client requested list of tools');
  return {
    tools: ncaaTools,
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  console.error(`🔧 Tool called: ${name}`);
  console.error(`📦 Arguments:`, args);

  try {
    const result = await executeNCAAool(name, args || {});

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    console.error(`❌ Error executing tool ${name}:`, error);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
          }),
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  console.error('🏈 Starting NCAA Stats MCP Server...');
  console.error('📊 Loading NCAA data...');

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('✅ NCAA Stats MCP Server is running!');
  console.error(`📋 Available tools: ${ncaaTools.map((t) => t.name).join(', ')}`);
}

main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
