import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { useId } from 'react';

import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';

dayjs.locale('pt-BR');

export function useSummaryController() {
  const containerSummaryId = useId();

  const { weeklySummaryOfCompletedGoals, isRefetchingWeeklySummary } =
    useGetWeeklySummaryOfCompletedGoalsQuery();

  const firstDayOfWeek = dayjs().startOf('week').format('D MMMM');
  const lastDayOfWeek = dayjs().endOf('week').format('D MMMM');

  const totalGoals = weeklySummaryOfCompletedGoals?.total!;
  const completedGoals = weeklySummaryOfCompletedGoals?.completed!;
  const percentGoalsCompleted =
    totalGoals > 0 ? ((completedGoals / totalGoals) * 100).toFixed(0) : 0;

  const goalsPerDay = weeklySummaryOfCompletedGoals?.goalsPerDay;
  const goalsPerDayArray = goalsPerDay
    ? Object.entries(goalsPerDay).map(([date, goals]) => ({ date, goals }))
    : [];

  return {
    containerSummaryId,
    firstDayOfWeek,
    lastDayOfWeek,
    completedGoals,
    totalGoals,
    percentGoalsCompleted,
    goalsPerDayArray,
    isRefetchingWeeklySummary,
  };
}
