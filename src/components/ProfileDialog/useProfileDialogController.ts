import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import type { GamificationInfo } from '@/@types/GamificationInfo';
import type { GoalsAndTotal } from '@/@types/Goals';
import type { UserResponse } from '@/@types/UserResponse';
import { useLogoutMutation } from '@/app/hooks/mutations/useLogoutMutation';
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
  const navigate = useNavigate();

  const { logout, isLogouting } = useLogoutMutation();

  const { goalsCompletedCount } = useGetTotalQuantityOfGoalsCompletedQuery();

  const [userLevelAndExperience, setUserLevelAndExperience] = useState(
    {} as GamificationInfo
  );
  const [goalsAndTotal, setGoalsAndTotal] = useState({} as GoalsAndTotal);

  async function handleLogout() {
    await logout();
    queryClient.clear();

    sessionStorage.setItem('userLeft', JSON.stringify(true));
    navigate({ to: '/login' });
  }

  useEffect(() => {
    const userLevel = queryClient.getQueryData([
      'userLevel',
    ]) as GamificationInfo;

    const goals = queryClient.getQueryData(['goals']) as GoalsAndTotal;

    setUserLevelAndExperience(userLevel);
    setGoalsAndTotal(goals ? goals : { goals: [], totalActiveGoals: 0 });
  }, [queryClient]);

  return {
    isProfileDialogOpen,
    userLevelAndExperience,
    goalsAndTotal,
    goalsCompletedCount,
    handleOpenProfileDialog,
    handleCloseProfileDialog,
    handleLogout,
    isLogouting,
  };
}
