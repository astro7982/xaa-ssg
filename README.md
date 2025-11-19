# NCAA Stats AI - Cross-App Access (XAA) Demo

> **A production-ready demonstration of Okta's Cross-App Access (XAA)** featuring OAuth 2.0 Token Exchange, AI-powered NCAA football statistics, and interactive comparison of Traditional OAuth vs Cross App Access.

![XAA Flow](https://img.shields.io/badge/Okta-XAA%20Demo-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 What This Demo Shows

This application demonstrates **real enterprise Cross-App Access** with:

- ✅ **Interactive Demo Mode Toggle** - Switch between Traditional OAuth and Cross App Access to see the difference
- ✅ **Traditional OAuth Inspector** - NEW! Shows the messy reality of OAuth with consent screens, token sprawl, and scaling problems
- ✅ **Cross App Access Inspector** - Technical deep-dive showing actual tokens, JWT assertions, and enterprise trust
- ✅ **Complete XAA Token Exchange** - Full 7-step OAuth flow with Okta
- ✅ **Real-Time Flow Visualization** - Watch both flows animate in real-time
- ✅ **AI-Powered Chat** - Natural language NCAA stats queries powered by Claude
- ✅ **Model Context Protocol (MCP)** - Secure data access pattern
- ✅ **Security Comparison** - Side-by-side demonstration of OAuth problems vs XAA benefits

### 🆕 NEW: Interactive Demo Mode

**Switch between two modes to show customers the difference:**

#### Traditional OAuth Mode (⚠️)
- Shows consent screen for EVERY query
- Displays overhead metrics (consent screens, time wasted, clicks)
- "View Traditional OAuth Flow" button opens detailed inspector showing:
  - OAuth access token structure
  - Consent screen details
  - Security problems (no IdP visibility, token sprawl, user friction)
  - **The Scaling Problem**: Why 1 integration = 1 consent screen breaks agent automation
  - Agent automation blocker (can't show consent screens in background!)

#### Cross App Access Mode (✅)
- Zero consent screens
- Instant authorization through enterprise trust
- "View Cross App Access Flow" button opens technical deep-dive showing:
  - Complete 7-step XAA flow
  - JWT Assertion (ID-JAG) - the "hero" token that replaces consent
  - Decoded tokens with full JWT breakdown
  - Timing data for each step
  - Why no user consent is needed (enterprise-level trust)

### 🎭 Perfect for Customer Demos

**Demo Flow:**
1. Start in **Traditional OAuth mode** → Customer sees consent screen pop up
2. Show **Traditional OAuth Inspector** → Reveal the problems (token sprawl, no IT visibility, agent automation blocker)
3. Switch to **Cross App Access mode** → Same query, zero consent screens!
4. Show **Cross App Access Inspector** → Explain JWT Assertion and enterprise trust
5. **The Pivot:** "Imagine this scaled to 50 integrations. Traditional OAuth = 50 consent screens. Cross App Access = zero!"

## 🌟 Why Cross-App Access (XAA)?

### The Enterprise Challenge

Modern enterprises face a critical security gap: **SaaS applications need to talk to each other on behalf of users, but traditional OAuth flows bypass the enterprise IdP entirely.**

**The Problem:**
```
User logs into App A via Enterprise IdP ✅
User logs into App B via Enterprise IdP ✅
App A needs data from App B... ❌

Traditional Solution:
App A → [Direct OAuth + Consent Screen] → App B
        ↑
    Enterprise IdP has NO visibility or control!
    User must manually click "Allow" every time!
```

**Quote from JPMorgan Chase CISO Patrick Opet:**
> "Modern integration patterns, however, dismantle these essential boundaries, relying heavily on modern identity protocols (e.g., OAuth) to create direct, often unchecked interactions between third-party services and firms' sensitive internal resources."

### The XAA Solution

**Cross-App Access extends your enterprise IdP's authority to app-to-app connections:**

```
User logs into App A via Enterprise IdP ✅
User logs into App B via Enterprise IdP ✅
App A needs data from App B...

XAA Solution:
App A → [Token Exchange] → Enterprise IdP → [ID-JAG] → App B
                            ↑
                    Full visibility & control!
                    Zero user consent needed!
```

### 🎯 Key Benefits

#### 1. **Zero User Friction**

✅ **No OAuth consent screens** for app-to-app access
- First login to App A → All enterprise apps automatically connected
- No "Click here to authorize" prompts
- Seamless user experience

❌ **Without XAA:** Users see OAuth popups for every app integration

#### 2. **Perfect for AI Agents**

✅ **AI agents can access enterprise tools** on behalf of users
- LLM agents integrate with SaaS apps securely
- Access scoped to user's actual permissions
- Enterprise visibility into AI data access
- **No consent screens** = agents can run in background/server

❌ **Without XAA:** Agent automation is IMPOSSIBLE (can't show consent screens in automated workflows)

**Example:** AI chatbot helping you schedule meetings:
- Accesses your calendar (App A)
- Accesses your email (App B)
- Accesses your CRM (App C)
- All via XAA with full enterprise control!

#### 3. **Centralized Enterprise Control**

✅ **IdP sits in the middle** of every app-to-app connection
- Enterprise admins configure which apps can talk to each other
- Policies managed in one place (your IdP)
- Real-time policy enforcement
- Full audit trail

❌ **Without XAA:** App-to-app connections are invisible to IT

#### 4. **Enterprise-Grade Security**

✅ **Multi-factor authentication** enforced consistently
- IdP validates authentication context before issuing tokens
- Step-up authentication when needed
- Enterprise security policies applied across all integrations

❌ **Without XAA:** Each app enforces security independently

#### 5. **Scales to Enterprise Needs**

✅ **50 integrations = 0 consent screens**
- Pre-configured trust relationships
- Instant access based on enterprise policy

❌ **Without XAA:** 50 integrations = 50 consent screens (users spend hours clicking "Allow"!)

#### 6. **Standards-Based Protocol**

✅ Built on **proven OAuth 2.0 standards:**
- RFC 8693: OAuth 2.0 Token Exchange
- RFC 7523: JWT Profile for Authorization Grants
- Works with existing OAuth infrastructure
- Interoperable across vendors

### 🚨 Security Comparison

| Feature | Traditional OAuth | With XAA |
|---------|------------------|----------|
| **Enterprise Visibility** | ❌ None | ✅ Complete |
| **Centralized Policy** | ❌ Per-app | ✅ IdP-managed |
| **User Experience** | ❌ Consent screens | ✅ Seamless |
| **AI Agent Support** | ❌ Impossible | ✅ Built-in |
| **Scaling** | ❌ N integrations = N consent screens | ✅ Always zero consent |
| **Session Management** | ❌ Fragmented | ✅ Unified |
| **MFA Enforcement** | ❌ Per-app | ✅ Consistent |
| **Audit Trail** | ❌ Scattered | ✅ Centralized |
| **Global Logout** | ❌ Partial | ✅ Complete |

### 💡 This Demo Shows

This NCAA Stats AI demo demonstrates **real XAA in action:**

1. ✅ **Interactive toggle** - Switch between Traditional OAuth and Cross App Access
2. ✅ **User logs in once** (to NCAA Agent via Okta)
3. ✅ **Traditional OAuth mode** - See consent screens and overhead
4. ✅ **Cross App Access mode** - Zero consent, instant access
5. ✅ **Token exchange** (Agent → Okta → ID-JAG → Todo0 → Access Token)
6. ✅ **Enterprise visibility** (All in Okta audit logs)
7. ✅ **Detailed inspectors** - Compare OAuth vs XAA token flows side-by-side

**Plus:** Watch both flows in real-time with our interactive visualizers!

### 📚 Learn More

- **Okta Blog:** [Integrate Your Enterprise AI Tools with Cross-App Access](https://developer.okta.com/blog/2025/06/23/enterprise-ai)
- **IETF Draft:** [Identity Assertion Authorization Grant](https://www.ietf.org/archive/id/draft-parecki-oauth-identity-assertion-authz-grant-05.txt)
- **RFC 8693:** [OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693)
- **RFC 7523:** [JWT Profile for OAuth 2.0 Authorization Grants](https://www.rfc-editor.org/rfc/rfc7523)

## 📺 Demo Preview

```
┌─────────────────────────────────────┐  ┌──────────────────────────────┐
│  Demo Mode: ⚠️  Traditional OAuth   │  │  🏈 NCAA STATS AI            │
│              ✅ Cross App Access    │  │                              │
├─────────────────────────────────────┤  │  Ask about NCAA teams,       │
│  📊 TRADITIONAL OAUTH OVERHEAD      │  │  standings, rankings...      │
│                                     │  │                              │
│  Consent Screens: 2                 │  │  > Who's leading Big Ten?    │
│  Time Wasted: 47s                   │  │                              │
│  Button Clicks: 4                   │  │  🔄 Consent Screen Appears   │
│  IT Visibility: NONE                │  │  (Traditional OAuth only)    │
│                                     │  │                              │
│  🔓 Security Oversight:             │  │  ✓ Indiana and Ohio State    │
│  Tokens stored outside IdP control  │  │    are tied at 3-0...        │
│                                     │  │                              │
│  [🔍 View Traditional OAuth Flow]   │  │  [🔍 View Cross App Access]  │
└─────────────────────────────────────┘  └──────────────────────────────┘

            Switch modes to compare! ⬆️  ⬇️
```

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           User Browser                                  │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  NCAA Stats AI Chat Interface (React)                          │     │
│  │  • Demo Mode Toggle (Traditional OAuth vs Cross App Access)    │     │
│  │  • Real-time XAA Flow Visualizer                               │     │
│  │  • Traditional OAuth Overhead Metrics                          │     │
│  │  • Consent Screen Simulator (Traditional mode)                 │     │
│  └────────────────────────────────────────────────────────────────┘     │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │
                            │ HTTPS (OAuth + Chat)
                            ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   NCAA Agent (Next.js - Port 3000)                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  NextAuth.js OAuth Client                                        │  │
│  │  • OpenID Connect to Okta                                        │  │
│  │  • Session Management                                            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  XAA Token Exchange Client                                       │  │
│  │  • RFC 8693 Token Exchange                                       │  │
│  │  • RFC 7523 JWT Bearer Grant                                     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  MCP Client (Model Context Protocol)                             │  │
│  │  • Spawns MCP Server as subprocess                               │  │
│  │  • JSON-RPC communication                                        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Claude AI Integration                                           │  │
│  │  • Anthropic API calls                                           │  │
│  │  • Tool use with MCP                                             │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────┬──────────────────────┬────────────────────┬───────────────────────┘
     │                      │                    │
     │ ① OAuth Login       │ ② Token Exchange   │ ④ MCP Queries
     │                      │                    │
     ▼                      ▼                    ▼
┌─────────────┐    ┌──────────────────┐    ┌──────────────────────┐
│   Okta IdP  │    │  Todo0 Auth      │    │  NCAA MCP Server     │
│             │    │  Server          │    │  (Node.js)           │
│ • Agent0    │    │                  │    │                      │
│ • Todo0     │    │  Port: 5001      │    │  ┌────────────────┐  │
│ • Managed   │◀──▶│                  │    │  │ NCAA Tools:    │  │
│  Connections│    │  ③ JWT Bearer   │    │  │ • get_standings│  │
│             │    │     Grant        │    │  │ • get_rankings │  │
│ • Issues    │    │                  │    │  │ • get_games    │  │
│   ID Tokens │    │  Issues Access   │    │  │ • get_stats    │  │
│ • Issues    │    │  Tokens for MCP  │    │  └────────────────┘  │
│   ID-JAG    │    │                  │    │                      │
└─────────────┘    └──────────────────┘    │  ┌────────────────┐  │
                                           │  │ Data Sources:  │  │
                                           │  │ • game_logs    │  │
                                           │  │ • standings    │  │
                                           │  │ • rankings     │  │
                                           │  │ • projections  │  │
                                           │  └────────────────┘  │
                                           └──────────────────────┘
```

### XAA Token Flow (The 7 Steps)

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ ① Login Request
     ▼
┌─────────────────────────────────────────────────────────────┐
│  NCAA Agent                                                 │
│  ┌────────────────────────────────────────────────┐         │
│  │ NextAuth redirects to Okta                     │         │
│  └────────────────────────────────────────────────┘         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ ② OAuth Authorization Request
                    ▼
          ┌──────────────────┐
          │   Okta IdP       │
          │  ┌────────────┐  │
          │  │ User Auth  │  │
          │  │ MFA, etc.  │  │
          │  └────────────┘  │
          └────┬─────────────┘
               │
               │ ③ ID Token (OpenID Connect)
               ▼
┌─────────────────────────────────────────────────────────────┐
│  NCAA Agent                                                 │
│  ┌────────────────────────────────────────────────┐         │
│  │ Stores ID Token in session                     │         │
│  │ User is now logged in ✓                        │         │
│  └────────────────────────────────────────────────┘         │
│                                                             │
│  [ User asks: "Who's leading Big Ten?" ]                    │
│                                                             │
│  ┌────────────────────────────────────────────────┐         │
│  │ Need MCP access → Start XAA Flow               │         │
│  └────────────────────────────────────────────────┘         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ ④ Token Exchange Request
                    │    POST /oauth2/token
                    │    grant_type=token-exchange
                    │    subject_token=<ID_TOKEN>
                    │    audience=http://localhost:5001
                    ▼
          ┌──────────────────┐
          │   Okta IdP       │
          │  ┌────────────┐  │
          │  │ Validate:  │  │
          │  │ • ID Token │  │
          │  │ • Policy   │  │
          │  │ • Managed  │  │
          │  │   Conn.    │  │
          │  └────────────┘  │
          └────┬─────────────┘
               │
               │ ⑤ ID-JAG (Identity Assertion JWT)
               │    Special cross-domain token
               ▼
┌─────────────────────────────────────────────────────────────┐
│  NCAA Agent                                                 │
│  ┌────────────────────────────────────────────────┐         │
│  │ Received ID-JAG from IdP                       │         │
│  └────────────────────────────────────────────────┘         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ ⑥ JWT Bearer Grant
                    │    POST /oauth2/token
                    │    grant_type=jwt-bearer
                    │    assertion=<ID_JAG>
                    ▼
          ┌──────────────────┐
          │  Todo0 Auth      │
          │  ┌────────────┐  │
          │  │ Validate:  │  │
          │  │ • ID-JAG   │  │
          │  │ • Signature│  │
          │  │ • Claims   │  │
          │  └────────────┘  │
          └────┬─────────────┘
               │
               │ ⑦ Access Token for MCP
               ▼
┌─────────────────────────────────────────────────────────────┐
│  NCAA Agent                                                 │
│  ┌────────────────────────────────────────────────┐         │
│  │ Now has Access Token!                          │         │
│  │ Can call MCP server                            │         │
│  └────────────────────────────────────────────────┘         │
│                                                             │
│  ⑧ Call MCP Server with Access Token                       │
│     get_standings(conference="Big Ten")                     │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ Authenticated MCP Request
                    ▼
          ┌──────────────────┐
          │  NCAA MCP Server │
          │  ┌────────────┐  │
          │  │ Validate   │  │
          │  │ Access     │  │
          │  │ Token      │  │
          │  └────────────┘  │
          │  ┌────────────┐  │
          │  │ Query Data │  │
          │  │ Files      │  │
          │  └────────────┘  │
          └────┬─────────────┘
               │
               │ ⑨ NCAA Data Response
               ▼
┌─────────────────────────────────────────────────────────────┐
│  NCAA Agent                                                 │
│  ┌────────────────────────────────────────────────┐         │
│  │ Send data to Claude AI for natural language    │         │
│  │ response generation                            │         │
│  └────────────────────────────────────────────────┘         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    │ ⑩ AI-Generated Response
                    ▼
          ┌──────────────────┐
          │  User Browser    │
          │  "Indiana and    │
          │  Ohio State are  │
          │  tied at 3-0!"   │
          └──────────────────┘
```

## 📋 Prerequisites

### Required

- **Okta Preview Account** (XAA is preview-only)
  - Get one at: [developer.okta.com](https://developer.okta.com)
  - ⚠️ **Must be preview** - not production!

- **Node.js** v18.x or later
- **Redis** (for auth server sessions)
- **Anthropic Claude API Key** (for AI chat)

### Okta OIN Applications

You need TWO pre-built OIN applications:
1. **Agent0** (wiki0) - Requesting application
2. **Todo0** - Resource application

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/xaa-ssg.git
cd xaa-ssg
npm install
```

### 2. Install Redis

**macOS:**
```bash
brew install redis
brew services start redis
```

**Linux:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis
```

**Verify:**
```bash
redis-cli ping
# Should return: PONG
```

### 3. Set Up Okta Applications

#### A. Create OIN Applications

1. Log into **Okta Preview** Admin Console
2. Go to **Applications** → **Browse App Catalog**

**Agent0 (Requesting App):**
- Search: "wiki0"
- Select: "Wiki0 - Cross App Access (XAA) Sample Requesting App"
- Click "Add Integration"
- Name: **NCAA AI Chat Bot**
- Click "Done"
- Go to **Sign On** → Copy **Client ID** and **Client Secret**

**Todo0 (Resource App):**
- Search: "todo0"
- Select: "Todo0 - Cross App Access (XAA) Sample Resource App"
- Click "Add Integration"
- Name: **NCAA Stats Server**
- Click "Done"
- Go to **Sign On** → Copy **Client ID** and **Client Secret**

#### B. Configure Managed Connections

⚠️ **CRITICAL STEP** - This creates the trust relationship:

1. Open **NCAA AI Chat Bot** (Agent0)
2. Go to **Manage Connections** tab
3. Under "App granted consent":
   - Click "Add requesting apps"
   - Select **NCAA Stats Server** (Todo0)
   - Save
4. Under "App providing consent":
   - Click "Add resource app"
   - Select **NCAA Stats Server** (Todo0)
   - Save

**✅ Verify:** Open Todo0 → Should automatically show Agent0 in both sections (bidirectional trust)

#### C. Configure Redirect URIs

**For Agent0 (NCAA AI Chat Bot):**

Go to **General Settings** → Edit → Add:

```
Redirect URI: http://YOUR_DOMAIN:3000/api/auth/callback/okta
Post Logout URI: http://YOUR_DOMAIN:3000
```

Replace `YOUR_DOMAIN` with:
- `localhost` for local development
- Your actual domain/IP for production

**Example:**
```
http://sportsstatsgather.com:3000/api/auth/callback/okta
http://sportsstatsgather.com:3000
```

### 4. Configure Environment Variables

#### NCAA Agent (.env.local)

```bash
cd packages/ncaa-agent
cp .env.local.example .env.local
```

Edit `.env.local`:

```bash
# Anthropic Claude API Key
ANTHROPIC_API_KEY=your_claude_api_key_here

# Agent0 - Direct Okta Connection
OKTA_CLIENT_ID=your_agent0_client_id
OKTA_CLIENT_SECRET=your_agent0_client_secret
OKTA_ISSUER=https://your-org.oktapreview.com
OKTA_DOMAIN=your-org.oktapreview.com

# Todo0 - Local Authorization Server
TODO0_CLIENT_ID=wiki0-at-todo0
TODO0_CLIENT_SECRET=secret-todo
TODO0_ISSUER=http://localhost:5001

# Token Exchange Audience - DO NOT CHANGE
TODO0_OKTA_AUDIENCE=http://localhost:5001

# NextAuth
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://YOUR_DOMAIN:3000

# MCP Server Path
MCP_SERVER_PATH=../ncaa-mcp-server/dist/server.js

# Public-facing URLs (for Next.js environment variables)
NEXT_PUBLIC_OKTA_ISSUER=https://your-org.oktapreview.com
```

#### Todo0 Authorization Server (.env.todo)

⚠️ **Required:** Clone the okta-cross-app-access-mcp repo:

```bash
cd /path/to/your/projects
git clone https://github.com/oktadev/okta-cross-app-access-mcp.git
cd okta-cross-app-access-mcp
yarn install
yarn bootstrap
```

Configure `.env.todo`:

```bash
cd packages/authorization-server
cp .env.todo.default .env.todo
```

Edit `.env.todo`:

```bash
AUTH_SERVER_PORT="5001"
AUTH_SERVER="http://localhost:5001"
REDIS_SERVER="redis://localhost:6379"

CUSTOMER1_EMAIL_DOMAIN="tables.fake"
CUSTOMER1_AUTH_ISSUER="https://your-org.oktapreview.com"
CUSTOMER1_CLIENT_ID=your_todo0_client_id
CUSTOMER1_CLIENT_SECRET=your_todo0_client_secret
```

### 5. Build MCP Server

```bash
cd packages/ncaa-mcp-server
npm run build
```

### 6. Start Services

You need **TWO terminals**:

**Terminal 1 - Todo0 Auth Server:**
```bash
cd /path/to/okta-cross-app-access-mcp
yarn auth:todo
```

**Terminal 2 - NCAA Agent:**
```bash
cd /path/to/xaa-ssg/packages/ncaa-agent
npm run dev
```

### 7. Access Application

Open: **http://localhost:3000**

## 🎮 Usage

### Basic Flow

1. Click **Sign in with Okta**
2. Enter your Okta credentials
3. Choose a demo mode:
   - **Traditional OAuth** - Experience consent screens
   - **Cross App Access** - Zero consent screens
4. Ask NCAA questions:
   - "Who's leading the Big Ten?"
   - "Compare Oregon and Ohio State"
   - "Show me top 10 teams"
   - "What are Penn State's playoff odds?"

### Demo Mode Toggle

**Switch between modes to demonstrate the difference:**

#### Traditional OAuth Mode
- Shows consent screen simulator for every query
- Displays real-time overhead metrics
- Click **"View Traditional OAuth Flow"** to see:
  - OAuth access token structure
  - Consent screen details
  - Security problems (no IdP visibility, token sprawl)
  - The scaling problem (why this breaks at enterprise scale)

#### Cross App Access Mode
- Zero consent screens
- Instant authorization
- Click **"View Cross App Access Flow"** to see:
  - Complete 7-step XAA flow
  - JWT Assertion (ID-JAG) breakdown
  - Decoded tokens with signatures
  - Timing data
  - Enterprise trust explanation

### Inspector Pages

**Traditional OAuth Inspector** (`/traditional-oauth-inspector`):
- 📊 User impact metrics (consent screens, delays, IT visibility)
- 🔐 OAuth access token visualization (decoded JWT)
- 📋 Consent screen details
- ⚠️ Security problems highlighted
- 📈 The scaling problem (1→10→50 integrations)
- ✅ Cross App Access solution comparison

**Cross App Access Inspector** (`/xaa-inspector`):
- 📊 Architecture diagram showing two authorization servers
- ⭐ JWT Assertion (ID-JAG) - the "hero" token
- 🔐 Decoded tokens (header, payload, signature)
- ⏱️ Timing data for each step
- 📝 Step-by-step flow explanations
- 💡 Why no user consent is needed
- 🎯 Key takeaways

### Perfect Demo Script

**5-minute customer demo:**

1. **Show Traditional OAuth mode** → "Watch what happens when I ask a question"
2. **Consent screen appears** → "Every integration requires this consent"
3. **Open Traditional OAuth Inspector** → "Look at the problems: no IT visibility, token sprawl, user friction"
4. **Show scaling problem** → "Now imagine 50 integrations = 50 consent screens!"
5. **Switch to Cross App Access mode** → "Same question, but watch this..."
6. **Zero consent screens!** → "Instant access through enterprise trust"
7. **Open Cross App Access Inspector** → "Here's how it works: JWT Assertion replaces consent"
8. **The close** → "That's the difference. Traditional OAuth doesn't scale. Cross App Access does."

## 🌐 Production Deployment

### Deploy to Server

**Recommended Setup:**
- Linux server (Ubuntu 20.04+)
- Both NCAA Agent and Todo0 Auth on same server
- Port forwarding: 3000 (public), 5001 (internal)

#### Step 1: Copy Files to Server

```bash
# From your local machine
scp -r packages/ncaa-agent user@your-server:/home/user/xaa-ssg/packages/
scp -r packages/ncaa-mcp-server user@your-server:/home/user/xaa-ssg/packages/
scp -r data user@your-server:/home/user/xaa-ssg/
```

#### Step 2: Server Setup

```bash
# SSH into server
ssh user@your-server

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Redis
sudo apt-get install redis-server
sudo systemctl start redis
sudo systemctl enable redis

# Install dependencies
cd /home/user/xaa-ssg/packages/ncaa-agent
npm install

cd /home/user/xaa-ssg/packages/ncaa-mcp-server
npm install
npm run build

# Clone and setup Todo0 Auth Server
cd /home/user
git clone https://github.com/oktadev/okta-cross-app-access-mcp.git
cd okta-cross-app-access-mcp
yarn install
yarn bootstrap
```

#### Step 3: Configure Environment

```bash
# Configure NCAA Agent
cd /home/user/xaa-ssg/packages/ncaa-agent
nano .env.local
# Update NEXTAUTH_URL to your public domain
# Keep TODO0_OKTA_AUDIENCE as http://localhost:5001

# Configure Todo0 Auth
cd /home/user/okta-cross-app-access-mcp/packages/authorization-server
nano .env.todo
# Set your Okta credentials
```

#### Step 4: Build Production

```bash
cd /home/user/xaa-ssg/packages/ncaa-agent
npm run build
```

#### Step 5: Create Systemd Services

**NCAA Agent Service:**
```bash
sudo nano /etc/systemd/system/ncaa-agent.service
```

```ini
[Unit]
Description=NCAA Agent
After=network.target

[Service]
Type=simple
User=user
WorkingDirectory=/home/user/xaa-ssg/packages/ncaa-agent
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

**Todo0 Auth Service:**
```bash
sudo nano /etc/systemd/system/todo0-auth.service
```

```ini
[Unit]
Description=Todo0 Auth Server
After=network.target redis.service

[Service]
Type=simple
User=user
WorkingDirectory=/home/user/okta-cross-app-access-mcp
Environment="ENV_FILE=.env.todo"
ExecStart=/usr/bin/yarn auth:todo
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

#### Step 6: Start Services

```bash
# Enable and start services
sudo systemctl enable ncaa-agent
sudo systemctl enable todo0-auth

sudo systemctl start todo0-auth
sudo systemctl start ncaa-agent

# Check status
sudo systemctl status ncaa-agent
sudo systemctl status todo0-auth

# View logs
sudo journalctl -u ncaa-agent -f
sudo journalctl -u todo0-auth -f
```

#### Step 7: Configure Router

**Port Forwarding:**
- Forward external port 3000 → server port 3000 (NCAA Agent)
- Forward external port 5001 → server port 5001 (Todo0 Auth)

**Update Okta:**
- Update redirect URIs to use your public domain

### Management Commands

```bash
# Restart services after code changes
sudo systemctl restart ncaa-agent
sudo systemctl restart todo0-auth

# Stop services
sudo systemctl stop ncaa-agent
sudo systemctl stop todo0-auth

# View logs
sudo journalctl -u ncaa-agent -n 100
sudo journalctl -u todo0-auth -n 100

# Check Redis
redis-cli ping
```

### Quick Deployment Script

Create `deploy.sh` on your server:

```bash
#!/bin/bash
# deploy.sh - Quick deployment script

cd /home/user/xaa-ssg/packages/ncaa-agent

# Pull latest changes (if using git)
# git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Build MCP server
cd ../ncaa-mcp-server
npm run build

# Restart services
sudo systemctl restart ncaa-agent

echo "✅ Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run deployment:
```bash
./deploy.sh
```

## ⚠️ Critical Gotchas (Lessons Learned)

### 1. Audience MUST Be `http://localhost:5001`

**Problem:** Okta hardcodes the token exchange audience to `localhost:5001` for managed connections.

**Solution:**
- Keep `TODO0_OKTA_AUDIENCE=http://localhost:5001`
- Even for remote deployments!
- Both services on same server = localhost works

### 2. Use CLIENT2 Credentials

**Problem:** `unauthorized_client` - requested grant type not allowed

**Cause:** Using CLIENT1 (todo0/secret) instead of CLIENT2

**Fix:**
```bash
TODO0_CLIENT_ID=wiki0-at-todo0      # CLIENT2
TODO0_CLIENT_SECRET=secret-todo      # CLIENT2
```

### 3. Okta Preview Required

**Problem:** Token exchange returns `invalid_grant`

**Cause:** Using production Okta org

**Fix:** Use **preview** org (`your-org.oktapreview.com`)

### 4. OIN Apps Cannot Use Custom Authorization Servers

**Problem:** `org_authorization_server_only_client` error

**Cause:** Trying to use custom auth server with OIN apps

**Fix:** Use org-level issuer: `https://your-org.oktapreview.com`

### 5. Managed Connections Required

**Problem:** Token exchange fails with no useful error

**Cause:** Missing bidirectional managed connection

**Fix:** Set up managed connections in both directions (Agent0 ↔ Todo0)

### 6. Redirect URI Must Match Exactly

**Problem:** `redirect_uri_mismatch`

**Fix:**
- `NEXTAUTH_URL` must match access URL
- Okta redirect URI must include `/api/auth/callback/okta`
- Check for typos!

## 🐛 Troubleshooting

### "Token Exchange Invalid Resource"

```
Okta logs: token_exchange_invalid_resource
```

**Fix:**
1. Verify `TODO0_OKTA_AUDIENCE=http://localhost:5001`
2. Restart NCAA Agent
3. Clear browser cookies

### "Unauthorized Client"

```
Error: requested grant type is not allowed for this client
```

**Fix:** Use CLIENT2 credentials (`wiki0-at-todo0` / `secret-todo`)

### OAuth Callback Errors

```
Error: redirect_uri_mismatch
```

**Fix:**
1. Match `NEXTAUTH_URL` to access URL
2. Add full callback URL to Okta: `http://domain:3000/api/auth/callback/okta`
3. Restart NCAA Agent

### Redis Connection Errors

```
Error: Redis connection failed
```

**Fix:**
```bash
redis-cli ping  # Check status
brew services start redis  # macOS
sudo systemctl start redis # Linux
```

### Port Conflicts

```
Error: EADDRINUSE: address already in use :::3000
```

**Fix:**
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9
```

## 📁 Project Structure

```
xaa-ssg/
├── packages/
│   ├── ncaa-agent/                    # Main Next.js application
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── auth/             # NextAuth OAuth
│   │   │   │   ├── chat/             # AI chat endpoint
│   │   │   │   └── xaa/              # XAA token exchange
│   │   │   ├── auth/                 # Sign-in pages
│   │   │   ├── xaa-inspector/        # Cross App Access Inspector
│   │   │   ├── traditional-oauth-inspector/  # Traditional OAuth Inspector
│   │   │   └── page.tsx              # Main UI with demo mode
│   │   ├── components/
│   │   │   ├── ChatInterface.tsx     # Chat UI with unified flow button
│   │   │   ├── DemoModeToggle.tsx    # Traditional OAuth vs Cross App Access toggle
│   │   │   ├── XAAFlowVisualizer.tsx # Real-time XAA flow monitor
│   │   │   ├── SessionMetrics.tsx    # Traditional OAuth overhead metrics
│   │   │   ├── ConsentSimulator.tsx  # Simulates OAuth consent screens
│   │   │   ├── TraditionalOAuthVisualizer.tsx  # OAuth flow diagram
│   │   │   ├── EnhancedXAADiagram.tsx          # XAA flow diagram
│   │   │   └── XAAInspector.tsx      # Cross App Access deep-dive
│   │   ├── lib/
│   │   │   ├── xaa-client.ts         # XAA implementation
│   │   │   ├── xaa-token-store.ts    # Token storage for inspector
│   │   │   └── demo-mode-context.tsx # Demo mode state management
│   │   └── .env.local                # Configuration
│   │
│   ├── ncaa-mcp-server/               # MCP Server
│   │   ├── src/
│   │   │   └── server.ts             # MCP tools
│   │   └── data/                     # NCAA JSON data
│   │       ├── game_logs.json
│   │       ├── standings.json
│   │       ├── projections.json
│   │       └── rankings.json
│   │
│   └── shared/                        # Shared types
│
└── data/                              # Additional NCAA data
```

## 🔑 Key Technologies

- **Next.js 14** - App router with server components
- **NextAuth.js** - OAuth authentication
- **Okta XAA** - Cross-app access with token exchange (RFC 8693 + RFC 7523)
- **Model Context Protocol** - AI tool integration standard
- **Anthropic Claude** - AI language model
- **Redis** - Session storage
- **node-oidc-provider** - Local OIDC server
- **React Context API** - Demo mode state management
- **Framer Motion** - Animations for flow visualizers

## 📊 NCAA Data

### Data Files

Located in `packages/ncaa-mcp-server/data/`:
- `game_logs.json` - Full game-by-game statistics
- `standings.json` - Current conference standings
- `projections.json` - Playoff/bowl projections
- `rankings.json` - Current top 25 rankings

### Updating Data

**Option 1: Replace JSON Files (Recommended)**

```bash
cd packages/ncaa-mcp-server/data/

# Backup existing data
cp game_logs.json game_logs.json.backup

# Replace with new data
cp /path/to/new/game_logs.json .

# Restart NCAA Agent
cd ../ncaa-agent
npm run dev
```

**Option 2: Automated Updates**

Create `update-ncaa-data.sh`:

```bash
#!/bin/bash
# Fetch fresh data
curl -o /tmp/game_logs.json https://your-data-source.com/game_logs

# Validate JSON
jq . /tmp/game_logs.json > /dev/null || exit 1

# Replace data files
cp /tmp/game_logs.json packages/ncaa-mcp-server/data/

# Restart service
sudo systemctl restart ncaa-agent

echo "✅ NCAA data updated!"
```

Schedule with cron:
```bash
# Update every Monday at 6 AM
0 6 * * 1 /path/to/update-ncaa-data.sh
```

No database needed - all data is file-based!

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- **Okta Developer Relations** for XAA guidance
- **oktadev/okta-cross-app-access-mcp** for auth server implementation
- **Anthropic** for Claude AI and MCP protocol

## 📞 Support

**Issues:** [GitHub Issues](https://github.com/yourusername/xaa-ssg/issues)
**Okta Forum:** [devforum.okta.com](https://devforum.okta.com)
**Documentation:** [developer.okta.com](https://developer.okta.com)

## ⚡ Quick Commands Reference

```bash
# Start Redis
brew services start redis              # macOS
sudo systemctl start redis             # Linux

# Start Todo0 Auth Server
cd okta-cross-app-access-mcp
yarn auth:todo

# Start NCAA Agent
cd xaa-ssg/packages/ncaa-agent
npm run dev

# Build MCP Server
cd packages/ncaa-mcp-server
npm run build

# Check ports
lsof -i:3000  # NCAA Agent
lsof -i:5001  # Todo0 Auth

# Kill processes
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9

# Production deployment
sudo systemctl restart ncaa-agent
sudo systemctl restart todo0-auth

# View logs
sudo journalctl -u ncaa-agent -f
sudo journalctl -u todo0-auth -f
```

## 🎯 Demo Script

**Perfect 5-minute customer demo:**

1. **Start in Traditional OAuth mode** → "Let me show you the typical OAuth experience"
2. **Ask question** → Consent screen appears → "Every integration requires this manual approval"
3. **Open Traditional OAuth Inspector** → "Look at these problems: no IT visibility, tokens stored outside IdP"
4. **Show scaling problem** → "Now imagine 50 integrations = 50 consent screens. Agent automation becomes impossible!"
5. **Switch to Cross App Access mode** → "Same question, but watch what happens..."
6. **Zero consent screens!** → "Instant access through enterprise trust"
7. **Open Cross App Access Inspector** → "Here's the JWT Assertion that replaces consent"
8. **The close** → "That's why enterprises need Cross App Access. Traditional OAuth doesn't scale."

---

**Built with ❤️ to demonstrate Cross-App Access**

📖 **New to XAA?** Read [XAA-vs-Token-Exchange.md](XAA-vs-Token-Exchange.md) for a deep dive on why simple token exchange isn't enough!