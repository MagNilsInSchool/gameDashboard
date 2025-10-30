export interface UserStatAggregate {
    userId: number;
    name: string;
    count: number;
    totalPlayed: number;
    sessions: { timePlayed: number; endedAt: Date }[];
}
