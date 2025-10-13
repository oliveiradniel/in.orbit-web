import { useGetAllGoalsQuery } from '@/app/hooks/queries/useGetAllGoalsQuery';
import { GoalContext } from '.';

interface GoalProviderProps {
  children: React.ReactNode;
}

export function GoalProvider({ children }: GoalProviderProps) {
  const { goals, totalActiveGoals, isSeekingAllGoals } = useGetAllGoalsQuery();

  const activeGoals = goals.filter((goal) => goal.isDeleted === false);
  const inactiveGoals = goals.filter((goal) => goal.isDeleted === true);

  const hasAnyGoal = goals.length > 0;
  const hasAnyActiveGoal = activeGoals.length > 0;

  return (
    <GoalContext.Provider
      value={{
        goals,
        totalActiveGoals,
        activeGoals,
        inactiveGoals,
        hasAnyGoal,
        hasAnyActiveGoal,
        isSeekingAllGoals,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}
