import { useQuery } from '@tanstack/react-query';

import { makeUserService } from '@/app/factories/makeUserService';

export function useGetUserLevelAndExperienceQuery() {
  const userService = makeUserService();

  const { data, isLoading } = useQuery({
    queryKey: ['userLevel'],
    queryFn: () => userService.getUserLevelAndExperience(),
  });

  return {
    userLevel: data,
    isLoadingUserLevel: isLoading,
  };
}
