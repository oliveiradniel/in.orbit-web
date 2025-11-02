import { Loader2 } from 'lucide-react';

import { useEffect } from 'react';

import githubInner from '@/assets/icons/github-inner.svg';

import { useOAuthMutation } from '@/app/hooks/mutations/useOAuthMutation';

interface SignInWithGitHubCallbackParams {
  code: string;
}

export function SignInWithGitHubCallback({
  code,
}: SignInWithGitHubCallbackParams) {
  const { authenticateFromGitHub, isAuthenticating } = useOAuthMutation();

  useEffect(() => {
    authenticateFromGitHub(code);
  }, [authenticateFromGitHub, code]);

  return (
    <div className="flex h-screen items-center justify-center">
      {isAuthenticating && (
        <div className="space-y-6">
          <img
            src={githubInner}
            alt=""
            width={200}
            height={200}
            className="opacity-80"
          />

          <div className="flex items-center gap-2">
            <Loader2 className="size-8 animate-spin text-gray-500" />
            Autenticando com GitHub
          </div>
        </div>
      )}
    </div>
  );
}
