type GoalPerDay = Record<
  string,
  {
    id: string;
    title: string;
    completedAt: Date;
  }[]
>;

export interface Summary {
  completed: number;
  total: number;
  goalsPerDay: GoalPerDay;
}

export type GoalStatus = 'not started' | 'started' | 'completed';

export interface GoalWithCompletionCount {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
  wasCompletedToday: boolean;
  status: GoalStatus;
}
