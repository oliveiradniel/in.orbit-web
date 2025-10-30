import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import type { UserResponse } from '@/@types/UserResponse';

import { useLogoutMutation } from '@/app/hooks/mutations/useLogoutMutation';
import { useGetAllGoalsQuery } from '@/app/hooks/queries/useGetAllGoalsQuery';
import { useGetGoalsCompletedCountQuery } from '@/app/hooks/queries/useGetGoalsCompletedCountQuery';
import { useGetUserLevelAndExperienceQuery } from '@/app/hooks/queries/useGetUserLevelAndExperienceQuery';

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

  const { goalsCompletedCount, hasErrorGoalsCompletedCount } =
    useGetGoalsCompletedCountQuery();
  const { userLevel } = useGetUserLevelAndExperienceQuery();
  const { goals, totalActiveGoals } = useGetAllGoalsQuery();

  async function handleLogout() {
    await logout();
    queryClient.clear();

    sessionStorage.setItem('userLeft', JSON.stringify(true));
    navigate({ to: '/login' });
  }

  return {
    isProfileDialogOpen,
    userLevelAndExperience: userLevel,
    goals,
    totalActiveGoals,
    goalsCompletedCount,
    handleOpenProfileDialog,
    handleCloseProfileDialog,
    handleLogout,
    isLogouting,
    hasErrorGoalsCompletedCount,
  };
}
