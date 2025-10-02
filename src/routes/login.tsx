import { createFileRoute, redirect } from '@tanstack/react-router';

import { queryClient } from '@/app/core/providers/queryClient';

import { makeUserService } from '@/app/factories/makeUserService';

import { SignInWithGitHub } from '@/pages/SignInWithGitHub';

function Login() {
  return <SignInWithGitHub />;
}

export const Route = createFileRoute('/login')({
  component: Login,

  beforeLoad: async () => {
    const usersService = makeUserService();

    try {
      await queryClient.ensureQueryData({
        queryKey: ['activeUser'],
        queryFn: () => usersService.me(),
      });
    } catch {
      return true;
    }

    throw redirect({ to: '/', replace: true });
  },
});
