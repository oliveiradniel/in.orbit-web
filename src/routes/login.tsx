import { createFileRoute } from '@tanstack/react-router';

import { SignInWithGitHub } from '@/pages/SignInWithGitHub';

function Login() {
  return <SignInWithGitHub />;
}

export const Route = createFileRoute('/login')({
  component: Login,
});
