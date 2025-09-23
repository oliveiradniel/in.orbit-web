import { useQuery } from '@tanstack/react-query';

import { makeUserService } from '@/app/factories/makeUserService';

export function useGetUserLevelAndExperienceQuery() {
  const usersService = makeUserService();

  const { data, isLoading } = useQuery({
    queryKey: ['userLevel'],
    queryFn: () => usersService.getUserLevelAndExperience(),
  });

  return {
    userLevel: data,
    isLoadingUserLevel: isLoading,
  };
}
