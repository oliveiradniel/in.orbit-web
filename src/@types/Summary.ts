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

export interface GoalWithCompletionCount {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}
