import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import type { GamificationInfo } from '@/@types/GamificationInfo';
import type { GoalsAndTotal } from '@/@types/Goals';
import type { UserResponse } from '@/@types/UserResponse';

import { useGetTotalQuantityOfGoalsCompletedQuery } from '@/app/hooks/queries/useGetTotalQuantityOfGoalsCompletedQuery';

export interface GoalData {
  id: string;
  title: string;
}

export interface ProfileDialogProps {
  userData: UserResponse;
  isOpen: boolean;
  onClose: () => void;
}

export function useProfileDialogController() {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  function handleOpenProfileDialog() {
    setIsProfileDialogOpen(true);
  }

  function handleCloseProfileDialog() {
    setIsProfileDialogOpen(false);
  }

  const queryClient = useQueryClient();

  const { goalsCompletedCount } = useGetTotalQuantityOfGoalsCompletedQuery();

  const [userLevelAndExperience, setUserLevelAndExperience] = useState(
    {} as GamificationInfo
  );
  const [goalsAndTotal, setGoalsAndTotal] = useState({} as GoalsAndTotal);

  useEffect(() => {
    const userLevel = queryClient.getQueryData([
      'userLevel',
    ]) as GamificationInfo;

    const goals = queryClient.getQueryData(['goals']) as GoalsAndTotal;

    setUserLevelAndExperience(userLevel);
    setGoalsAndTotal(goals);
  }, [queryClient]);

  return {
    isProfileDialogOpen,
    userLevelAndExperience,
    goalsAndTotal,
    goalsCompletedCount,
    handleOpenProfileDialog,
    handleCloseProfileDialog,
  };
}
