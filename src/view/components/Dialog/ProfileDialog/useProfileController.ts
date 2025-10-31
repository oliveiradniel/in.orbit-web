import { useState } from 'react';

import { useLogoutMutation } from '@/app/hooks/mutations/useLogoutMutation';
import { useGetAllGoalsQuery } from '@/app/hooks/queries/useGetAllGoalsQuery';
import { useGetGoalsCompletedCountQuery } from '@/app/hooks/queries/useGetGoalsCompletedCountQuery';
import { useGetUserLevelAndExperienceQuery } from '@/app/hooks/queries/useGetUserLevelAndExperienceQuery';

export function useProfileController() {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  function handleOpenProfileDialog() {
    setIsProfileDialogOpen(true);
  }

  function handleCloseProfileDialog() {
    setIsProfileDialogOpen(false);
  }

  const { logout, isLogouting } = useLogoutMutation();

  const { goalsCompletedCount, hasErrorGoalsCompletedCount } =
    useGetGoalsCompletedCountQuery();
  const { userLevel } = useGetUserLevelAndExperienceQuery();
  const { goals, totalActiveGoals } = useGetAllGoalsQuery();

  function handleLogout() {
    logout();
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
