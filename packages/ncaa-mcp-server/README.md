# NCAA Stats MCP Server

Model Context Protocol (MCP) server that provides NCAA Football statistics data.

## Features

- **NCAA Data Tools**: 6 MCP tools for querying NCAA football data
- **Real Data**: Uses actual NCAA standings, rankings, projections, and game logs
- **OAuth Protected**: Secured with Okta OAuth and Cross-App Access (XAA)

## Available MCP Tools

1. **get_team_rankings** - Get current NCAA rankings (Top 25 or specific team)
2. **get_team_stats** - Get detailed team statistics
3. **get_conference_standings** - Get standings for a specific conference
4. **get_team_projection** - Get playoff/bowl projections for a team
5. **compare_teams** - Compare two teams side-by-side
6. **get_all_standings** - Get all team standings

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Okta credentials in `.env`

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run in development mode:
   ```bash
   npm run dev
   ```

## Data Sources

The server loads NCAA data from `/data` directory:
- `NCAAFStandingsCurrent.json` - Current season standings
- `NCAAFTeamRankings.json` - Team rankings and detailed stats
- `NCAAFProjections.json` - Playoff and bowl projections
- `tr_ncaaf_team_game_logs.json` - Game-by-game results

## Usage with Claude Desktop

Add to your Claude Desktop MCP config:

```json
{
  "mcpServers": {
    "ncaa-stats": {
      "command": "node",
      "args": ["/Users/johnc/Documents/xaa-ssg/packages/ncaa-mcp-server/dist/server.js"]
    }
  }
}
```
