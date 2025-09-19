// types/index.ts
export type Team = {
  teamName: string;
  leaderName: string;
  phone: string;
  email: string;
  domain: string;
  noOfParticipants: string;
};

export type SpotTeam = {
  teamName: string;
  leaderName: string;
  phone: string;
  email: string;
  domain: string;
  noOfParticipants: string;
  institute: string;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
  createdAt?: any; // Firebase serverTimestamp
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
