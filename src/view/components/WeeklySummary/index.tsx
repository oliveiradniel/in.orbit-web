import dayjs from 'dayjs';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Pencil,
  Plus,
  X,
} from 'lucide-react';

import inOrbitIcon from '@/assets/images/in-orbit-icon.svg';

import { GoalsButtons } from '../GoalsButtons';

import { Button } from '../ui/Button';
import { Progress, ProgressIndicator } from '../ui/ProgressBar';
import { Separator } from '../ui/Separator';
import { UserProfile } from './components/UserProfile';

import { useWeeklySummaryController } from './useWeeklySummaryController';

dayjs.extend(utc);
dayjs.extend(timezone);

interface WeeklySummaryProps {
  hasAnyActiveGoal: boolean;
  onOpenNewGoalDialog: () => void;
  onOpenDeleteGoalsDialog: () => void;
}

export function WeeklySummary({
  hasAnyActiveGoal,
  onOpenNewGoalDialog,
  onOpenDeleteGoalsDialog,
}: WeeklySummaryProps) {
  const {
    containerSummaryId,
    firstDayOfWeek,
    lastDayOfWeek,
    completedGoals,
    weeklyFrequencyOfAllGoals,
    percentGoalsCompleted,
    goalsPerDayArray,
    isRefetchingWeeklySummary,
    isTheCurrentWeek,
    hasErrorWeeklySummary,
    handlePreviousWeek,
    handleNextWeek,
    refetchWeeklySummary,
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
            disabled={isRefetchingWeeklySummary || !hasAnyActiveGoal}
            onClick={onOpenDeleteGoalsDialog}
            className="w-full"
          >
            <Pencil className="size-4" />
            Gerenciar metas
          </Button>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        <Progress
          aria-label="Progresso semanal das metas"
          aria-valuenow={completedGoals}
          aria-valuemin={0}
          aria-valuemax={weeklyFrequencyOfAllGoals}
          value={completedGoals}
          max={weeklyFrequencyOfAllGoals}
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
            <span className="text-zinc-100">{weeklyFrequencyOfAllGoals}</span>{' '}
            metas nessa semana.
          </span>
          <span>{percentGoalsCompleted}%</span>
        </div>
      </div>

      <Separator />

      {hasAnyActiveGoal && <GoalsButtons />}

      <main
        aria-labelledby={containerSummaryId}
        className="flex flex-col gap-6"
      >
        {hasErrorWeeklySummary && (
          <div className="space-y-4">
            <p className="text-zinc-400">
              Não foi possível buscar o resumo semanal de metas.
            </p>

            <Button
              aria-live="polite"
              type="button"
              variant="danger"
              onClick={() => refetchWeeklySummary()}
            >
              Tentar novamente.
            </Button>
          </div>
        )}

        {!hasErrorWeeklySummary && (
          <>
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
                  Você {isTheCurrentWeek && 'ainda'} não completou nenhuma meta
                  esta semana.
                  {isTheCurrentWeek &&
                    ' Clique em qualquer uma das metas criadas acima para concluí-las!'}
                </p>
              </div>
            )}

            {goalsPerDayArray?.map(({ date, goals }) => {
              const weekDay = dayjs(date).format('dddd');
              const formattedDate = dayjs(date).format('D[ de ] MMMM');

              return (
                <section
                  key={date}
                  className="animate-fade-in flex flex-col gap-4"
                >
                  <h2 className="font-medium">
                    <span className="capitalize">{weekDay} </span>

                    <span className="text-sm text-zinc-400">
                      ({formattedDate})
                    </span>
                  </h2>

                  <ul
                    aria-label="Lista de metas"
                    className="flex flex-col gap-3"
                  >
                    {goals.map(({ id, completedAt, title, isDeleted }) => {
                      const time = dayjs
                        .utc(completedAt)
                        .tz('America/Sao_Paulo')
                        .format('HH:mm');

                      return (
                        <li key={id} className="flex items-center gap-2">
                          <CheckCircle2
                            aria-hidden="true"
                            className="size-4 text-pink-500"
                          />

                          <span className="text-sm text-zinc-400">
                            Você completou "
                            <span className="text-zinc-100">{title}</span>" às{' '}
                            <time dateTime="" className="text-zinc-100">
                              {time}h
                            </time>
                          </span>

                          {isDeleted && (
                            <div className="relative ml-2 overflow-hidden rounded-full border border-zinc-900 px-4 py-2.5">
                              <div className="absolute right-0 h-4 w-4 bg-pink-500/60 blur-lg" />
                              <div className="absolute left-0 h-4 w-4 bg-violet-500/60 blur-lg" />

                              <div className="flex items-center gap-2 text-zinc-500">
                                <X className="size-4 text-red-500" />
                                <span className="text-xs text-zinc-400">
                                  Excluída
                                </span>
                              </div>
                            </div>
                          )}

                          {!isDeleted && (
                            <div className="relative ml-2 overflow-hidden rounded-full border border-zinc-900 px-4 py-2.5">
                              <div className="absolute right-0 h-4 w-4 bg-green-500/60 blur-lg" />
                              <div className="absolute left-0 h-4 w-4 bg-green-500/60 blur-lg" />

                              <div className="flex items-center gap-2 text-zinc-500">
                                <Check className="size-4 text-green-500" />
                                <span className="text-xs text-zinc-400">
                                  Ativa
                                </span>
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </>
        )}
      </main>
    </div>
  );
}
