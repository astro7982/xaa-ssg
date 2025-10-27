# NCAA AI Chat Bot - Agent0

Beautiful NCAA-themed AI chatbot with **real-time Cross-App Access (XAA) visualization**.

## Features

🏈 **NCAA Football Theme**
- Field green backgrounds
- Scoreboard-style UI
- Football-inspired animations

🔐 **XAA Flow Visualization**
- Real-time token exchange monitoring
- 7-step authentication flow display
- Live status updates

🤖 **Claude AI Integration**
- Natural language queries
- NCAA stats expertise via MCP
- Context-aware responses

## UI Components

### 1. XAA Flow Visualizer
Shows the complete Cross-App Access flow:
1. User Login
2. ID Token Received
3. Token Exchange
4. ID-JAG Received
5. Access Token Request
6. MCP Query
7. Data Returned

### 2. Chat Interface
- NCAA-themed design
- Example questions
- Real-time message updates
- Loading states

## Setup

1. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your credentials in `.env.local`

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5000](http://localhost:5000)

## Development

```bash
# Development server (port 5000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Next Steps

- [ ] Integrate Anthropic Claude API
- [ ] Implement OAuth authentication flow
- [ ] Connect to NCAA MCP Server
- [ ] Add XAA token exchange logic
- [ ] Implement session management

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Auth**: NextAuth.js + Okta
- **AI**: Anthropic Claude API
- **MCP**: Model Context Protocol SDK
