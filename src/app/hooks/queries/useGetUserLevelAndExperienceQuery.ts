import { useQuery } from '@tanstack/react-query';

import { makeUserService } from '@/app/factories/makeUserService';

export function useGetUserLevelAndExperienceQuery() {
  const usersService = makeUserService();

  const { data, isLoading } = useQuery({
    queryKey: ['user-level'],
    queryFn: () => usersService.getUserLevelAndExperience(),
  });

  return {
    userLevel: data,
    isLoadingUserLevel: isLoading,
  };
}
