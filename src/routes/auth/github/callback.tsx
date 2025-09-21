import { createFileRoute } from '@tanstack/react-router';

import { router } from '@/App';

import { SignInWithGitHubCallback } from '@/pages/SignInWithGitHubCallback';

interface AuthGitHubSearch {
  code: string | undefined;
}

interface AuthGitHubParams {
  code: string;
}

function AuthGitHubCallback() {
  const params = Route.useSearch() as AuthGitHubParams;

  return <SignInWithGitHubCallback code={params.code} />;
}

export const Route = createFileRoute('/auth/github/callback')({
  component: AuthGitHubCallback,
  validateSearch: (search: Record<string, unknown>): AuthGitHubSearch => {
    return {
      code: (search.code as string) || undefined,
    };
  },
  beforeLoad: ({ search }) => {
    const code = search.code;

    if (!code) {
      router.navigate({ to: '/login', replace: true });
      return false;
    }

    return true;
  },
});
