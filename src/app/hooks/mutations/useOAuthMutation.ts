import { useMutation } from '@tanstack/react-query';

import { makeOAuthService } from '@/app/factories/makeOAuthService';

export function useOAuthMutation() {
  const oauthService = makeOAuthService();

  const { mutateAsync: authenticateFromGitHub, isPending: isAuthenticating } =
    useMutation({
      mutationFn: async (code: string) => {
        return oauthService.githubLogin(code);
      },
    });

  return {
    authenticateFromGitHub,
    isAuthenticating,
  };
}
