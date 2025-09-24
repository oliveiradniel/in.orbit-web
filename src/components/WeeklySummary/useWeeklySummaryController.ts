import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { useSearch } from '@tanstack/react-router';
import { useId } from 'react';

import { router } from '@/App';

import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';

dayjs.locale('pt-BR');

export function useWeeklySummaryController() {
  const containerSummaryId = useId();

  const { weekStartsAt } = useSearch({ from: '/' });

  const { weeklySummaryOfCompletedGoals, isRefetchingWeeklySummary } =
    useGetWeeklySummaryOfCompletedGoalsQuery();

  const firstDayOfWeek = dayjs(weekStartsAt).startOf('week').format('D MMMM');
  const lastDayOfWeek = dayjs(weekStartsAt).endOf('week').format('D MMMM');

  const totalGoals = weeklySummaryOfCompletedGoals?.total!;
  const completedGoals = weeklySummaryOfCompletedGoals?.completed!;
  const percentGoalsCompleted =
    totalGoals > 0 ? ((completedGoals / totalGoals) * 100).toFixed(0) : 0;

  const goalsPerDay = weeklySummaryOfCompletedGoals?.goalsPerDay;
  const goalsPerDayArray = goalsPerDay
    ? Object.entries(goalsPerDay).map(([date, goals]) => ({ date, goals }))
    : [];

  function handlePreviousWeek() {
    router.navigate({
      to: '/',
      search: {
        weekStartsAt: dayjs(weekStartsAt).subtract(7, 'days').toISOString(),
      },
    });
  }

  function handleNextWeek() {
    router.navigate({
      to: '/',
      search: {
        weekStartsAt: dayjs(weekStartsAt).add(7, 'days').toISOString(),
      },
    });
  }

  const isNextWeekButtonDisabled = dayjs(weekStartsAt)
    .endOf('week')
    .isAfter(new Date());

  return {
    containerSummaryId,
    firstDayOfWeek,
    lastDayOfWeek,
    completedGoals,
    totalGoals,
    percentGoalsCompleted,
    goalsPerDayArray,
    isRefetchingWeeklySummary,
    isNextWeekButtonDisabled,
    handlePreviousWeek,
    handleNextWeek,
  };
}
