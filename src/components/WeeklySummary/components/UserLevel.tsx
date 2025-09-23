import { useGetUserLevelAndExperienceQuery } from '@/app/hooks/queries/useGetUserLevelAndExperienceQuery';

import { Progress, ProgressIndicator } from '@/components/ui/ProgressBar';

export function UserLevel() {
  const { userLevel } = useGetUserLevelAndExperienceQuery();

  const percentage = Math.round(
    (userLevel?.experiencePoints! * 100) / userLevel?.experienceToNextLevel!
  );

  return (
    <div className="flex w-full max-w-[220px] flex-col gap-1">
      <div className="flex w-full items-center justify-between px-2 text-[10px] text-zinc-200">
        <span>Lvl {userLevel?.level}</span>
        <span className="text-zinc-400">
          {userLevel?.experiencePoints}XP de {userLevel?.experienceToNextLevel}
          XP
        </span>
        <span>{percentage}%</span>
      </div>

      <Progress
        aria-label="Progresso de pontos de experiência do usuário"
        aria-valuenow={userLevel?.experiencePoints}
        aria-valuemin={0}
        aria-valuemax={userLevel?.experienceToNextLevel}
        value={userLevel?.experiencePoints}
        max={userLevel?.experienceToNextLevel}
        className="bg-zinc-800"
      >
        <ProgressIndicator style={{ width: `${percentage}%` }} />
      </Progress>
    </div>
  );
}
