import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { CheckCircle2, Plus } from 'lucide-react';

import { useId } from 'react';
import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';

import inOrbitIcon from '@/assets/images/in-orbit-icon.svg';

import { GoalButtons } from './GoalButtons';
import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';
import { Progress, ProgressIndicator } from './ui/ProgressBar';
import { Separator } from './ui/Separator';

dayjs.locale('pt-BR');

export function Summary() {
  const containerSummaryId = useId();

  const { weeklySummaryOfCompletedGoals } =
    useGetWeeklySummaryOfCompletedGoalsQuery();

  const firstDayOfWeek = dayjs().startOf('week').format('D MMMM');
  const lastDayOfWeek = dayjs().endOf('week').format('D MMMM');

  const totalGoals = weeklySummaryOfCompletedGoals?.total!;
  const completedGoals = weeklySummaryOfCompletedGoals?.completed!;
  const percentGoalsCompleted =
    totalGoals > 0 ? ((completedGoals / totalGoals) * 100).toFixed(0) : 0;

  const goalsPerDay = weeklySummaryOfCompletedGoals?.goalsPerDay;
  const goalsPerDayArray = goalsPerDay
    ? Object.entries(goalsPerDay)
        .map(([date, goals]) => ({ date, goals }))
        .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
    : [];

  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-6 px-5 py-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img aria-hidden="true" src={inOrbitIcon} alt="" />

          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <Dialog.Trigger asChild>
          <Button type="button" size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </Dialog.Trigger>
      </header>

      <div className="flex flex-col gap-3">
        <Progress
          aria-label="Progresso semanal das metas"
          aria-valuenow={completedGoals}
          aria-valuemin={0}
          aria-valuemax={totalGoals}
          value={completedGoals}
          max={totalGoals}
        >
          <ProgressIndicator
            style={{
              width: `${percentGoalsCompleted}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{completedGoals}</span> de{' '}
            <span className="text-zinc-100">{totalGoals}</span> metas nessa
            semana.
          </span>
          <span>{percentGoalsCompleted}%</span>
        </div>
      </div>

      <Separator />

      <GoalButtons />

      <main
        aria-labelledby={containerSummaryId}
        className="flex flex-col gap-6"
      >
        <h1 id={containerSummaryId} className="text-2xl font-medium">
          Sua semana
        </h1>

        {goalsPerDayArray?.map(({ date, goals }) => {
          const weekDay = dayjs(date).format('dddd');
          const formattedDate = dayjs(date).format('D[ de ] MMMM');

          return (
            <section key={date} className="flex flex-col gap-4">
              <h2 className="font-medium">
                <span className="capitalize">{weekDay} </span>

                <span className="text-sm text-zinc-400">({formattedDate})</span>
              </h2>

              <ul aria-label="Lista de metas" className="flex flex-col gap-3">
                {goals.map((goal) => {
                  const time = dayjs(goal.completedAt).format('HH:mm');

                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2
                        aria-hidden="true"
                        className="size-4 text-pink-500"
                      />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{' '}
                        <time dateTime="" className="text-zinc-100">
                          {time}h
                        </time>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </main>
    </div>
  );
}
