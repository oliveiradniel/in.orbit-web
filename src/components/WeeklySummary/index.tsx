import dayjs from 'dayjs';

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Pencil,
  Plus,
} from 'lucide-react';

import inOrbitIcon from '@/assets/images/in-orbit-icon.svg';

import { GoalButtons } from '../GoalButtons';

import { Button } from '../ui/Button';
import { Progress, ProgressIndicator } from '../ui/ProgressBar';
import { Separator } from '../ui/Separator';
import { UserProfile } from './components/UserProfile';

import { useWeeklySummaryController } from './useWeeklySummaryController';

interface WeeklySummaryProps {
  onOpenNewGoalDialog: () => void;
  onOpenEditGoalsDialog: () => void;
}

export function WeeklySummary({
  onOpenNewGoalDialog,
  onOpenEditGoalsDialog,
}: WeeklySummaryProps) {
  const {
    containerSummaryId,
    firstDayOfWeek,
    lastDayOfWeek,
    completedGoals,
    totalGoals,
    percentGoalsCompleted,
    goalsPerDayArray,
    isRefetchingWeeklySummary,
    isTheCurrentWeek,
    handlePreviousWeek,
    handleNextWeek,
  } = useWeeklySummaryController();

  return (
    <div className="mx-auto flex max-w-[600px] flex-col gap-6 px-5 py-10">
      <header className="flex flex-col justify-between gap-6">
        <UserProfile />

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <img aria-hidden="true" src={inOrbitIcon} alt="" />

            <span className="text-lg font-semibold capitalize">
              {firstDayOfWeek} - {lastDayOfWeek}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              aria-label="Ir para a semana anterior"
              variant="secondary"
              size="icon"
              onClick={handlePreviousWeek}
            >
              <ArrowLeft className="size-4" />
            </Button>

            <Button
              aria-label="Ir para a próxima semana"
              variant="secondary"
              size="icon"
              disabled={isTheCurrentWeek}
              onClick={handleNextWeek}
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-stretch gap-2">
          <Button
            type="button"
            size="sm"
            disabled={isRefetchingWeeklySummary}
            onClick={onOpenNewGoalDialog}
            className="w-full"
          >
            <Plus className="size-4" />
            Cadastrar meta
          </Button>

          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={isRefetchingWeeklySummary}
            onClick={onOpenEditGoalsDialog}
            className="w-full"
          >
            <Pencil className="size-4" />
            Editar metas
          </Button>
        </div>
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
        <h1
          id={containerSummaryId}
          className="flex items-end gap-4 text-2xl leading-none font-medium"
        >
          Sua semana
          {isRefetchingWeeklySummary && (
            <Loader2 className="size-5 animate-spin text-pink-500" />
          )}
        </h1>

        {completedGoals === 0 && (
          <div>
            <p className="text-zinc-500">
              Você {isTheCurrentWeek && 'ainda'} não completou nenhuma meta esta
              semana.
              {isTheCurrentWeek &&
                ' Clique em qualquer uma das metas criadas acima para concluí-las!'}
            </p>
          </div>
        )}

        {goalsPerDayArray?.map(({ date, goals }) => {
          const weekDay = dayjs(date).format('dddd');
          const formattedDate = dayjs(date).format('D[ de ] MMMM');

          return (
            <section key={date} className="animate-fade-in flex flex-col gap-4">
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
