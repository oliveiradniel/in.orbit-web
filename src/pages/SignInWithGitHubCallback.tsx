import { Loader2 } from 'lucide-react';

import { useEffect } from 'react';

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
        <Loader2 className="size-8 animate-spin text-gray-500" />
      )}
    </div>
  );
}
