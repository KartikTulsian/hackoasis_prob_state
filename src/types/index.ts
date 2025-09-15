// types/index.ts
export type Team = {
  teamName: string;
  leaderName: string;
  phone: string;
  email: string;
  domain: string;
};

export type Problem_Statements = {
  id: string;
  title: string;
  challenge?: string;
  yourMission?: string;
  yourSolution?: string[];
  bonus?: string[];
  domain: string;
  sdgs: string[];
  maxTeams: number;     // 1 or 2
  takenBy?: string[];   // teamName array
};
