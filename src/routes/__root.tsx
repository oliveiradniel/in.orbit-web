import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import type { UserResponse } from '@/@types/UserResponse';
import { queryClient } from '@/app/core/providers/queryClient';
import { makeUserService } from '@/app/factories/makeUserService';

export const Route = createRootRoute({
  component: () => <Outlet />,
  beforeLoad: async () => {
    const usersService = makeUserService();

    let user: UserResponse;

    try {
      user = await queryClient.ensureQueryData({
        queryKey: ['activeUser'],
        queryFn: () => usersService.me(),
      });
    } catch {
      throw redirect({ to: '/login', replace: true });
    }

    return { user };
  },
});
