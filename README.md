# NCAA Stats AI - Cross-App Access (XAA) Demo

> **A production-ready demonstration of Okta's Cross-App Access (XAA)** featuring OAuth 2.0 Token Exchange, AI-powered NCAA football statistics, and real-time security visualization.

![XAA Flow](https://img.shields.io/badge/Okta-XAA%20Demo-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 What This Demo Shows

This application demonstrates **real enterprise Cross-App Access** with:

- ✅ **Complete XAA Token Exchange** - Full 7-step OAuth flow with Okta
- ✅ **XAA Flow Inspector** - NEW! Technical deep-dive showing actual tokens, JWT assertions, and two authorization servers
- ✅ **Security Visualization** - Real-time XAA flow monitor
- ✅ **Token Security Demo** - Intentionally exposes insecure caching (perfect for security sales!)
- ✅ **AI-Powered Chat** - Natural language NCAA stats queries
- ✅ **Model Context Protocol (MCP)** - Secure data access pattern

### 🔐 Security Demo Feature

**This demo intentionally shows insecure token caching** to demonstrate the need for token vault solutions:

- ⚠️ Tokens visible in browser memory
- 👁️ "View Exposed Tokens" button reveals actual JWTs
- ⏱️ Live exposure timer counting seconds
- **Perfect pivot:** "This is why enterprises need secure token vaults!"

## 🌟 Why Cross-App Access (XAA)?

### The Enterprise Challenge

Modern enterprises face a critical security gap: **SaaS applications need to talk to each other on behalf of users, but traditional OAuth flows bypass the enterprise IdP entirely.**

**The Problem:**
```
User logs into App A via Enterprise IdP ✅
User logs into App B via Enterprise IdP ✅
App A needs data from App B... ❌

Traditional Solution:
App A → [Direct OAuth] → App B
        ↑
    Enterprise IdP has NO visibility or control!
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
```

### 🎯 Key Benefits

#### 1. **Centralized Enterprise Control**

✅ **IdP sits in the middle** of every app-to-app connection
- Enterprise admins configure which apps can talk to each other
- Policies managed in one place (your IdP)
- Real-time policy enforcement

❌ **Without XAA:** App-to-app connections are invisible to IT

#### 2. **Zero User Friction**

✅ **No OAuth consent screens** for app-to-app access
- First login to App A → All enterprise apps automatically connected
- No "Click here to authorize" prompts
- Seamless user experience

❌ **Without XAA:** Users see OAuth popups for every app integration

#### 3. **Enterprise-Grade Security**

✅ **Multi-factor authentication** enforced consistently
- IdP validates authentication context before issuing tokens
- Step-up authentication when needed
- Enterprise security policies applied across all integrations

❌ **Without XAA:** Each app enforces security independently

#### 4. **Perfect for AI Agents**

✅ **AI agents can access enterprise tools** on behalf of users
- LLM agents integrate with SaaS apps securely
- Access scoped to user's actual permissions
- Enterprise visibility into AI data access

**Example:** AI chatbot helping you schedule meetings:
- Accesses your calendar (App A)
- Accesses your email (App B)
- Accesses your CRM (App C)
- All via XAA with full enterprise control!

#### 5. **Standards-Based Protocol**

✅ Built on **proven OAuth 2.0 standards:**
- RFC 8693: OAuth 2.0 Token Exchange
- RFC 7523: JWT Profile for Authorization Grants
- Works with existing OAuth infrastructure
- Interoperable across vendors

#### 6. **Session Management**

✅ **Full session lifecycle visibility**
- IdP maintains session state across all apps
- Global logout terminates all app sessions
- Session timeout policies enforced enterprise-wide

❌ **Without XAA:** Apps maintain independent sessions

### 🏢 Enterprise Use Cases

#### Use Case 1: Integrated SaaS Applications
**Scenario:** Email client needs to access calendaring app

**Without XAA:**
1. User opens email → OAuth popup
2. User clicks "Authorize Calendar Access"
3. IT has no visibility into connection

**With XAA:**
1. User opens email → Automatic access (if allowed by policy)
2. No user interaction needed
3. IT admin pre-configured which apps can integrate
4. Full audit trail in IdP logs

#### Use Case 2: AI Agent with Enterprise Tools
**Scenario:** LLM agent helping user with enterprise tasks

**Without XAA:**
- Agent can't access enterprise apps safely
- User must manually grant access to each tool
- No enterprise policy enforcement

**With XAA:**
- Agent requests access via IdP
- Enterprise policy: "Allow AI-Agent to access CRM for users in Sales group"
- Access granted automatically if policy permits
- Full audit trail of AI data access

#### Use Case 3: Email Client → Calendar Integration
**Scenario:** Desktop email client needs calendar access

**Traditional OAuth:**
- Disruptive web-based OAuth flow from desktop app
- User sees consent screens
- Connection invisible to IT

**With XAA:**
- Seamless token exchange via IdP
- Zero user interaction
- IT maintains full control

### 📊 The Identity Chaining Advantage

XAA uses **"Identity Chaining"** to maintain trust across domains:

```
1. User authenticates with IdP
   ↓ (ID Token)
2. App A receives ID Token

3. App A needs App B access
   ↓ (Token Exchange Request + ID Token)
4. IdP validates request & policy
   ↓ (ID-JAG = Identity Assertion JWT Authorization Grant)
5. App A receives ID-JAG

6. App A presents ID-JAG to App B
   ↓ (JWT Bearer Grant)
7. App B validates ID-JAG signature (trusts IdP)
   ↓ (Access Token)
8. App B grants access

Result: IdP orchestrated the entire flow!
```

### 🚨 Security Comparison

| Feature | Traditional OAuth | With XAA |
|---------|------------------|----------|
| **Enterprise Visibility** | ❌ None | ✅ Complete |
| **Centralized Policy** | ❌ Per-app | ✅ IdP-managed |
| **User Experience** | ❌ Consent screens | ✅ Seamless |
| **AI Agent Support** | ❌ Difficult | ✅ Built-in |
| **Session Management** | ❌ Fragmented | ✅ Unified |
| **MFA Enforcement** | ❌ Per-app | ✅ Consistent |
| **Audit Trail** | ❌ Scattered | ✅ Centralized |
| **Global Logout** | ❌ Partial | ✅ Complete |

### 💡 This Demo Shows

This NCAA Stats AI demo demonstrates **real XAA in action:**

1. ✅ **User logs in once** (to NCAA Agent via Okta)
2. ✅ **Agent needs NCAA data** (from Todo0 MCP server)
3. ✅ **Token exchange** (Agent → Okta → ID-JAG)
4. ✅ **Access granted** (ID-JAG → Todo0 → Access Token)
5. ✅ **Data flows** (MCP query returns NCAA stats)
6. ✅ **Enterprise visibility** (All in Okta audit logs)

**Plus:** Watch the entire flow in real-time with our XAA Flow Visualizer!

### 📚 Learn More

- **Okta Blog:** [Integrate Your Enterprise AI Tools with Cross-App Access](https://developer.okta.com/blog/2025/06/23/enterprise-ai)
- **IETF Draft:** [Identity Assertion Authorization Grant](https://www.ietf.org/archive/id/draft-parecki-oauth-identity-assertion-authz-grant-05.txt)
- **RFC 8693:** [OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693)
- **RFC 7523:** [JWT Profile for OAuth 2.0 Authorization Grants](https://www.rfc-editor.org/rfc/rfc7523)

## 📺 Demo Preview

```
┌─────────────────────────────────────┐  ┌──────────────────────────────┐
│  🔐 XAA FLOW MONITOR                │  │  🏈 NCAA STATS AI            │
│                                     │  │                              │
│  1. User Login            ✓         │  │  Ask about NCAA teams,       │
│  2. ID Token              ✓         │  │  standings, rankings...      │
│  3. Token Exchange        ✓         │  │                              │
│  4. ID-JAG                ✓         │  │  > Who's leading Big Ten?    │
│  5. Access Token          ✓         │  │                              │
│  6. MCP Query             ✓         │  │  Indiana and Ohio State      │
│  7. Data                  ✓         │  │  are tied at 3-0...          │
│                                     │  │                              │
│  ⚠️ SECURITY RISK                   │  │                              │
│  Token stored in browser memory     │  │                              │
│  • Exposed for 47s                  │  │                              │
│  • Vulnerable to XSS                │  │                              │
│  [👁️ View Exposed Tokens]           │  │                              │
└─────────────────────────────────────┘  └──────────────────────────────┘
```

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           User Browser                                  │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │  NCAA Stats AI Chat Interface (React)                          │     │
│  │  • Real-time XAA Flow Visualizer                               │     │
│  │  • Token Security Warning Display                              │     │ 
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
     │ ① OAuth Login        │ ② Token Exchange   │ ④ MCP Queries
     │                      │                    │
     ▼                      ▼                    ▼
┌─────────────┐    ┌──────────────────┐    ┌──────────────────────┐
│   Okta IdP  │    │  Todo0 Auth      │    │  NCAA MCP Server     │
│             │    │  Server          │    │  (Node.js)           │
│ • Agent0    │    │                  │    │                      │
│ • Todo0     │    │  Port: 5001      │    │  ┌────────────────┐ │
│ • Managed   │◀──▶│                  │    │  │ NCAA Tools:    │ │
│  Connections│    │  ③ JWT Bearer   │    │  │ • get_standings│ │
│             │    │     Grant        │    │  │ • get_rankings │ │
│ • Issues    │    │                  │    │  │ • get_games    │ │
│   ID Tokens │    │  Issues Access   │    │  │ • get_stats    │ │
│ • Issues    │    │  Tokens for MCP  │    │  └────────────────┘ │
│   ID-JAG    │    │                  │    │                      │
└─────────────┘    └──────────────────┘    │  ┌────────────────┐ │
                                            │  │ Data Sources:  │ │
                                            │  │ • game_logs    │ │
                                            │  │ • standings    │ │
                                            │  │ • rankings     │ │
                                            │  │ • projections  │ │
                                            │  └────────────────┘ │
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
│  NCAA Agent                                                  │
│  ┌────────────────────────────────────────────────┐         │
│  │ Send data to Claude AI for natural language   │         │
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

### Component Responsibilities

| Component | Purpose | Key Technologies |
|-----------|---------|------------------|
| **NCAA Agent** | Main application hosting chat UI, OAuth client, XAA implementation | Next.js 14, NextAuth.js, React, TypeScript |
| **Okta IdP** | Enterprise identity provider, issues ID tokens and ID-JAG tokens | Okta (Preview), OpenID Connect, Token Exchange |
| **Todo0 Auth Server** | Local authorization server, validates ID-JAG and issues MCP access tokens | node-oidc-provider, Redis, Express |
| **NCAA MCP Server** | Provides NCAA data tools via Model Context Protocol | Node.js, MCP SDK, JSON data files |
| **Claude AI** | Generates natural language responses using MCP tool data | Anthropic Claude API |

### Security Boundaries

```
┌─────────────────────────────────────────────────────────────┐
│  Trust Domain: Enterprise (Okta)                            │
│  ┌────────────┐          ┌─────────────┐                    │
│  │ NCAA Agent │◀────────▶│  Okta IdP   │                    │
│  │ (Agent0)   │  OAuth   │             │                    │
│  └────────────┘          └─────────────┘                    │
│        │                        │                           │
│        │                        │ Managed                   │
│        │                        │ Connection                │
│        │                        │                           │
│        │                 ┌──────▼──────┐                    │
│        │                 │   Todo0     │                    │
│        │                 │   (OIN App) │                    │
│        │                 └──────┬──────┘                    │
└────────┼────────────────────────┼───────────────────────────┘
         │                        │
         │ XAA Cross-Domain       │
         │ Token Exchange         │
         │                        │
┌────────▼────────────────────────▼───────────────────────────┐
│  Trust Domain: Local MCP Server                             │
│  ┌─────────────────┐    ┌──────────────────┐                │
│  │  Todo0 Auth     │───▶│  NCAA MCP Server │                │
│  │  Server         │    │  (Protected      │                │
│  │  (Port 5001)    │    │   Resource)      │                │
│  └─────────────────┘    └──────────────────┘                │
│                                    │                        │
│                          ┌─────────▼────────┐               │
│                          │  NCAA Data Files │               │
│                          │  (JSON)          │               │
│                          └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

**Key Security Features:**
- ✅ **IdP Orchestration**: All token flows go through Okta
- ✅ **Zero User Consent**: Managed connections eliminate OAuth popups
- ✅ **Token Validation**: ID-JAG signed by IdP, validated by Todo0
- ✅ **Scoped Access**: Access tokens limited to specific MCP operations
- ✅ **Audit Trail**: All token exchanges logged in Okta

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

1. Click **Sign in with Okta**
2. Enter your Okta credentials
3. Watch the **XAA Flow Monitor** animate through 7 steps
4. Ask NCAA questions:
   - "Who's leading the Big Ten?"
   - "Compare Oregon and Ohio State"
   - "Show me top 10 teams"
   - "What are Penn State's playoff odds?"

### XAA Flow Inspector (NEW!)

After completing a query, click the **🔍 View XAA Flow** button to see:

**What It Shows:**
- 📊 **Architecture Diagram** - Two authorization servers with trust relationship
- ⭐ **JWT Assertion (ID-JAG)** - The "hero" token that replaces user consent
- 🔐 **Decoded Tokens** - Full JWT header, payload, and signature breakdown
- ⏱️ **Timing Data** - How fast each token exchange happens
- 📝 **Step-by-Step Flow** - Complete 7-step token exchange with explanations
- 💡 **Why No Consent** - Clear explanation of enterprise trust

**Perfect For:**
- Technical deep-dives with engineering teams
- Showing the actual JWT assertion in action
- Explaining two authorization servers concept
- Demonstrating cryptographic validation

**Pro Tip:** Use this to answer "Why isn't simple token exchange enough?"
Read [XAA-vs-Token-Exchange.md](XAA-vs-Token-Exchange.md) for talking points!

### Security Demo

After first query:
1. See ⚠️ **SECURITY RISK** warning appear
2. Watch exposure timer count up
3. Click **"👁️ View Exposed Tokens"**
4. Show actual JWT sitting in memory
5. **Sales pivot:** "This is why enterprises need token vaults!"

## 🌐 Remote Access Setup

### Deploy to Server with Port Forwarding

**Architecture:**
```
Internet → Router (Port Forward) → Linux Server
                                       ├── NCAA Agent (3000)
                                       └── Todo0 Auth (5001)
                                            ↑
                                   localhost:5001 stays internal!
```

**Steps:**

1. **Deploy both services to same server**
2. **Configure router port forwarding:**
   - `External:3000 → Server:3000`
   - `External:5001 → Server:5001`

3. **Update `.env.local`:**
   ```bash
   NEXTAUTH_URL=http://your-public-domain.com:3000
   ```

4. **Update Okta redirect URIs:**
   - Add: `http://your-public-domain.com:3000/api/auth/callback/okta`

5. **Keep localhost audience:**
   ```bash
   TODO0_OKTA_AUDIENCE=http://localhost:5001  # DO NOT CHANGE
   ```

### Why This Works

Both services run on the **same server** and communicate via `localhost:5001` internally. From the server's perspective, everything IS localhost. Users access via your public URL, but XAA token exchange happens server-side using localhost, satisfying Okta's hardcoded audience requirement.

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

### 7. Token Signature Failures After Restart

**Problem:** `JWSSignatureVerificationFailed`

**Cause:** Auth server uses in-memory JWKS (regenerates on restart)

**Fix:** Sign out and sign back in after restarting auth server

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
│   │   │   └── page.tsx              # Main UI
│   │   ├── components/
│   │   │   ├── ChatInterface.tsx     # Chat UI
│   │   │   └── XAAFlowVisualizer.tsx # XAA flow monitor
│   │   ├── lib/
│   │   │   └── xaa-client.ts         # XAA implementation
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

## 🔒 Security Notes

### Intentional Security Issues (For Demo)

This demo **deliberately** shows insecure token handling:

✅ **Intentional (Demo Purpose):**
- Tokens cached in React state (browser memory)
- Tokens visible via "View Exposed Tokens" button
- No encryption or secure storage
- **Use this to demonstrate token vault value!**

❌ **Production Recommendations:**
- Use secure token vaults
- Implement token encryption
- Use HttpOnly cookies
- Add XSS protection
- Implement CSRF tokens

## 📊 NCAA Data

### Data Files

Located in `packages/ncaa-mcp-server/data/`:
- `game_logs.json` - Full game-by-game statistics
- `standings.json` - Current conference standings
- `projections.json` - Playoff/bowl projections
- `rankings.json` - Current top 25 rankings

### Updating Data

To update with fresh NCAA data, you have two options:

#### Option 1: Replace JSON Files (Recommended)

1. **Prepare your updated data** in JSON format matching the existing structure
2. **Replace the files:**
   ```bash
   cd packages/ncaa-mcp-server/data/

   # Backup existing data (optional)
   cp game_logs.json game_logs.json.backup
   cp standings.json standings.json.backup
   cp projections.json projections.json.backup
   cp rankings.json rankings.json.backup

   # Replace with new data
   cp /path/to/new/game_logs.json .
   cp /path/to/new/standings.json .
   cp /path/to/new/projections.json .
   cp /path/to/new/rankings.json .
   ```

3. **Restart the NCAA Agent:**
   ```bash
   # Stop the running process (Ctrl+C in the terminal)
   # Then restart:
   cd packages/ncaa-agent
   npm run dev
   ```

The MCP server will automatically reload with the new data!

#### Option 2: Hot Reload During Development

For rapid testing without full restart:

```bash
# In packages/ncaa-mcp-server/data/
# Edit your JSON files directly

# Rebuild MCP server
cd packages/ncaa-mcp-server
npm run build

# The NCAA Agent will pick up changes on next query
# (No restart needed if you're just updating data, not code)
```

### Data Format Examples

**game_logs.json:**
```json
[
  {
    "team": "Oregon",
    "opponent": "Ohio State",
    "date": "2024-10-12",
    "result": "W",
    "score": "32-31",
    "yards": 496,
    "turnovers": 1
  }
]
```

**standings.json:**
```json
{
  "Big Ten": [
    {
      "team": "Indiana",
      "conference_record": "3-0",
      "overall_record": "7-0"
    }
  ]
}
```

**projections.json:**
```json
[
  {
    "team": "Oregon",
    "playoff_odds": "92%",
    "projected_bowl": "Rose Bowl"
  }
]
```

**rankings.json:**
```json
[
  {
    "rank": 1,
    "team": "Oregon",
    "record": "8-0",
    "points": 1547
  }
]
```

### Automated Data Updates (Advanced)

For production deployments, you can automate data updates:

```bash
#!/bin/bash
# update-ncaa-data.sh

# Fetch fresh data from your source
curl -o /tmp/game_logs.json https://your-data-source.com/game_logs
curl -o /tmp/standings.json https://your-data-source.com/standings

# Validate JSON (optional but recommended)
jq . /tmp/game_logs.json > /dev/null || exit 1
jq . /tmp/standings.json > /dev/null || exit 1

# Replace data files
cp /tmp/game_logs.json packages/ncaa-mcp-server/data/
cp /tmp/standings.json packages/ncaa-mcp-server/data/

# Restart the service (if using pm2 or systemd)
pm2 restart ncaa-agent
# OR
# systemctl restart ncaa-agent

echo "NCAA data updated successfully!"
```

Schedule with cron:
```bash
# Update data every Monday at 6 AM (after weekend games)
0 6 * * 1 /path/to/update-ncaa-data.sh
```

### Data Validation

Before updating, validate your JSON:

```bash
# Check if JSON is valid
jq . packages/ncaa-mcp-server/data/game_logs.json

# Pretty print and check structure
jq '.[0]' packages/ncaa-mcp-server/data/game_logs.json
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
```

## 🎯 Demo Script

**Perfect 5-minute demo flow:**

1. **Show login** → "Watch the XAA flow in action"
2. **Ask first question** → "See all 7 steps of token exchange"
3. **Ask second question** → "Now it's using cached token - faster!"
4. **Click security warning** → "But look at this security risk..."
5. **Show exposed token** → "JWT sitting in browser memory for X seconds"
6. **The pivot** → "This is why enterprises need secure token vaults!"

---

**Built with ❤️ to demonstrate Cross-App Access**

📖 **New to XAA?** Read [XAA-vs-Token-Exchange.md](XAA-vs-Token-Exchange.md) for a deep dive on why simple token exchange isn't enough!
