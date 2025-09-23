import { createFileRoute, redirect } from '@tanstack/react-router';

import { queryClient } from '@/app/core/providers/queryClient';

import { SignInWithGitHub } from '@/pages/SignInWithGitHub';

function Login() {
  return <SignInWithGitHub />;
}

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: () => {
    const user = queryClient.getQueryData(['activeUser']);
    if (user) {
      throw redirect({ to: '/', replace: true });
    }
  },
});
