// Shared TypeScript types for NCAA XAA Demo

export interface Team {
  id: string;
  name: string;
  conference: string;
  wins: number;
  losses: number;
  ranking?: number;
}

export interface TeamStats {
  teamId: string;
  teamName: string;
  offenseYards: number;
  defenseYards: number;
  pointsScored: number;
  pointsAllowed: number;
  turnovers: number;
}

export interface Standing {
  teamName: string;
  conference: string;
  wins: number;
  losses: number;
  confWins: number;
  confLosses: number;
}

export interface Projection {
  teamName: string;
  playoffOdds: number;
  bowlOdds: number;
  projectedWins: number;
}

// XAA Token Flow Types
export interface XAAFlowStep {
  step: number;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  timestamp?: number;
  details?: string;
}

export type XAAFlowStepName =
  | 'user_login'
  | 'id_token_received'
  | 'token_exchange'
  | 'id_jag_received'
  | 'access_token_request'
  | 'access_token_received'
  | 'mcp_query'
  | 'data_returned';

export interface TokenExchangeLog {
  timestamp: number;
  step: XAAFlowStepName;
  token?: string;
  success: boolean;
  error?: string;
}
