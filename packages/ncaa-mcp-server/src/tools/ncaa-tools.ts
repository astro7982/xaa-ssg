import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { ncaaData } from '../data/ncaa-data-loader.js';

// Define all NCAA MCP tools

export const ncaaTools: Tool[] = [
  {
    name: 'get_team_rankings',
    description: 'Get current NCAA football team rankings. Can retrieve top 25 or specific team ranking.',
    inputSchema: {
      type: 'object',
      properties: {
        teamName: {
          type: 'string',
          description: 'Optional: Specific team name to get ranking for'
        },
        top: {
          type: 'number',
          description: 'Optional: Get top N teams (default: 25)'
        }
      }
    }
  },
  {
    name: 'get_team_stats',
    description: 'Get detailed statistics for a specific NCAA football team including offense, defense, and scoring stats.',
    inputSchema: {
      type: 'object',
      properties: {
        teamName: {
          type: 'string',
          description: 'Name of the team to get stats for (e.g., "Oregon", "Ohio State")'
        }
      },
      required: ['teamName']
    }
  },
  {
    name: 'get_conference_standings',
    description: 'Get current standings for a specific conference.',
    inputSchema: {
      type: 'object',
      properties: {
        conference: {
          type: 'string',
          description: 'Conference name (e.g., "Big Ten", "SEC", "Big 12", "ACC")'
        }
      },
      required: ['conference']
    }
  },
  {
    name: 'get_team_projection',
    description: 'Get playoff and bowl game projections for a team, including odds and projected wins.',
    inputSchema: {
      type: 'object',
      properties: {
        teamName: {
          type: 'string',
          description: 'Name of the team to get projections for'
        }
      },
      required: ['teamName']
    }
  },
  {
    name: 'compare_teams',
    description: 'Compare statistics between two NCAA football teams.',
    inputSchema: {
      type: 'object',
      properties: {
        team1: {
          type: 'string',
          description: 'First team name'
        },
        team2: {
          type: 'string',
          description: 'Second team name'
        }
      },
      required: ['team1', 'team2']
    }
  },
  {
    name: 'get_all_standings',
    description: 'Get standings for all teams across all conferences.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_team_games',
    description: 'Get all game results for a specific team, including week, opponent, location, and score.',
    inputSchema: {
      type: 'object',
      properties: {
        teamName: {
          type: 'string',
          description: 'Name of the team to get games for (e.g., "Miami", "Vanderbilt", "Delaware")'
        }
      },
      required: ['teamName']
    }
  },
  {
    name: 'get_last_game',
    description: 'Get the most recent game result for a specific team.',
    inputSchema: {
      type: 'object',
      properties: {
        teamName: {
          type: 'string',
          description: 'Name of the team to get last game for'
        }
      },
      required: ['teamName']
    }
  }
];

// Tool execution handlers
export async function executeNCAAool(
  toolName: string,
  args: any
): Promise<any> {
  console.error(`🏈 Executing NCAA tool: ${toolName}`, args);

  switch (toolName) {
    case 'get_team_rankings':
      return getTeamRankings(args);

    case 'get_team_stats':
      return getTeamStats(args);

    case 'get_conference_standings':
      return getConferenceStandings(args);

    case 'get_team_projection':
      return getTeamProjection(args);

    case 'compare_teams':
      return compareTeams(args);

    case 'get_all_standings':
      return getAllStandings();

    case 'get_team_games':
      return getTeamGames(args);

    case 'get_last_game':
      return getLastGame(args);

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

// Tool implementations
function getTeamRankings(args: { teamName?: string; top?: number }) {
  if (args.teamName) {
    const ranking = ncaaData.getTeamRanking(args.teamName);
    return ranking || { error: `Team "${args.teamName}" not found in rankings` };
  }

  const top = args.top || 25;
  const rankings = ncaaData.getTop25Rankings().slice(0, top);
  return { rankings, count: rankings.length };
}

function getTeamStats(args: { teamName: string }) {
  const ranking = ncaaData.getTeamRanking(args.teamName);
  if (!ranking) {
    return { error: `Team "${args.teamName}" not found` };
  }
  return ranking;
}

function getConferenceStandings(args: { conference: string }) {
  const standings = ncaaData.getConferenceStandings(args.conference);
  if (standings.length === 0) {
    return { error: `No standings found for conference "${args.conference}"` };
  }
  return { conference: args.conference, standings, count: standings.length };
}

function getTeamProjection(args: { teamName: string }) {
  const projection = ncaaData.getTeamProjection(args.teamName);
  if (!projection) {
    return { error: `Projections for "${args.teamName}" not found` };
  }
  return projection;
}

function compareTeams(args: { team1: string; team2: string }) {
  const team1Data = ncaaData.getTeamRanking(args.team1);
  const team2Data = ncaaData.getTeamRanking(args.team2);

  if (!team1Data || !team2Data) {
    return {
      error: `Could not find data for ${!team1Data ? args.team1 : args.team2}`
    };
  }

  return {
    team1: team1Data,
    team2: team2Data,
    comparison: {
      rankingDiff: (team1Data.rank || 999) - (team2Data.rank || 999)
    }
  };
}

function getAllStandings() {
  const standings = ncaaData.getStandings();
  return { standings, count: standings.length };
}

function getTeamGames(args: { teamName: string }) {
  const games = ncaaData.getTeamGames(args.teamName);
  if (!games || games.length === 0) {
    return { error: `No games found for "${args.teamName}"` };
  }
  return {
    team: args.teamName,
    games,
    totalGames: games.length
  };
}

function getLastGame(args: { teamName: string }) {
  const games = ncaaData.getTeamGames(args.teamName);
  if (!games || games.length === 0) {
    return { error: `No games found for "${args.teamName}"` };
  }

  const lastGame = games[games.length - 1];
  return {
    team: args.teamName,
    lastGame,
    totalGames: games.length
  };
}
