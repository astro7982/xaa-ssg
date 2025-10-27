import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to data directory (going up from src/data to project root)
const DATA_DIR = join(__dirname, '../../../../data');

export interface NCAAGameLog {
  team: string;
  opponent: string;
  date: string;
  points: number;
  opponentPoints: number;
  yards: number;
  // Add more fields as needed
}

export interface NCAAStanding {
  team: string;
  conference: string;
  wins: number;
  losses: number;
  confWins: number;
  confLosses: number;
}

export interface NCAAProjection {
  team: string;
  playoffOdds: number;
  bowlOdds: number;
  projWins: number;
}

export interface NCAATeamRanking {
  team: string;
  rank: number;
  stats: {
    offense: any;
    defense: any;
    scoring: any;
  };
}

class NCAADataLoader {
  private gameLogs: any = {};
  private standings: any[] = [];
  private projections: any = {};
  private rankings: any[] = [];

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      // Load all NCAA JSON files
      this.gameLogs = JSON.parse(
        readFileSync(join(DATA_DIR, 'tr_ncaaf_team_game_logs.json'), 'utf-8')
      );

      this.standings = JSON.parse(
        readFileSync(join(DATA_DIR, 'NCAAFStandingsCurrent.json'), 'utf-8')
      );

      this.projections = JSON.parse(
        readFileSync(join(DATA_DIR, 'NCAAFProjections.json'), 'utf-8')
      );

      this.rankings = JSON.parse(
        readFileSync(join(DATA_DIR, 'NCAAFTeamRankings.json'), 'utf-8')
      );

      console.error('✅ NCAA data loaded successfully');
      console.error(`   - Game Logs: ${Object.keys(this.gameLogs).length} teams`);
      console.error(`   - Standings: ${this.standings.length} teams`);
      console.error(`   - Projections: ${Object.keys(this.projections.conferences || {}).length} conferences`);
      console.error(`   - Rankings: ${this.rankings.length} teams`);
    } catch (error) {
      console.error('❌ Error loading NCAA data:', error);
      throw error;
    }
  }

  getGameLogs(): any[] {
    return this.gameLogs;
  }

  getStandings(): any[] {
    return this.standings;
  }

  getProjections(): any[] {
    return this.projections;
  }

  getRankings(): any[] {
    return this.rankings;
  }

  // Helper methods for fuzzy team name matching
  private matchTeamName(actual: string, search: string): boolean {
    const actualLower = actual.toLowerCase();
    const searchLower = search.toLowerCase();

    // Exact match
    if (actualLower === searchLower) return true;

    // Contains match (e.g., "Miami" matches "Miami (FL)")
    if (actualLower.includes(searchLower) || searchLower.includes(actualLower)) return true;

    // Remove parentheses and try again
    const actualClean = actualLower.replace(/\s*\([^)]*\)/g, '');
    const searchClean = searchLower.replace(/\s*\([^)]*\)/g, '');
    if (actualClean === searchClean) return true;

    return false;
  }

  getTeamStanding(teamName: string): any | null {
    return this.standings.find(
      (s: any) => this.matchTeamName(s.team || '', teamName)
    ) || null;
  }

  getTeamProjection(teamName: string): any | null {
    // Check projections by conference
    for (const conf in this.projections.conferences || {}) {
      const found = this.projections.conferences[conf].find(
        (p: any) => this.matchTeamName(p.team || '', teamName)
      );
      if (found) return found;
    }
    return null;
  }

  getTeamRanking(teamName: string): any | null {
    const stats = this.rankings.find(
      (r: any) => this.matchTeamName(r.team || '', teamName)
    );

    const standing = this.getTeamStanding(teamName);
    const projection = this.getTeamProjection(teamName);

    if (!stats && !standing) return null;

    // Calculate ranking based on wins and playoff odds
    const allRanked = this.getTop25Rankings();
    const rank = allRanked.findIndex(
      (r: any) => this.matchTeamName(r.team || '', teamName)
    );

    return {
      team: teamName,
      rank: rank !== -1 ? rank + 1 : null,
      record: standing ? `${standing.w}-${standing.l}` : null,
      conference: standing?.conference,
      stats: stats || {},
      projection: projection || null
    };
  }

  getConferenceStandings(conference: string): any[] {
    return this.standings.filter(
      (s: any) => s.conference?.toLowerCase() === conference.toLowerCase()
    );
  }

  getTeamGames(teamName: string): any[] {
    // Game logs is an object with team names as keys
    for (const team in this.gameLogs) {
      if (this.matchTeamName(team, teamName)) {
        return this.gameLogs[team] || [];
      }
    }
    return [];
  }

  getTop25Rankings(): any[] {
    // Create rankings based on wins, win percentage, and playoff odds
    return this.standings
      .map((s: any) => {
        const winPct = s.w / (s.w + s.l);
        const projection = this.getTeamProjection(s.team);
        const playoffOdds = projection?.odds?.playoff ?
          parseFloat(projection.odds.playoff.replace('%', '')) : 0;

        return {
          team: s.team,
          record: `${s.w}-${s.l}`,
          wins: s.w,
          losses: s.l,
          winPct,
          conference: s.conference,
          playoffOdds,
          projection
        };
      })
      .sort((a: any, b: any) => {
        // Sort by wins first, then by playoff odds
        if (b.wins !== a.wins) return b.wins - a.wins;
        if (b.winPct !== a.winPct) return b.winPct - a.winPct;
        return b.playoffOdds - a.playoffOdds;
      })
      .slice(0, 25)
      .map((team, index) => ({
        ...team,
        rank: index + 1
      }));
  }
}

// Export singleton instance
export const ncaaData = new NCAADataLoader();
