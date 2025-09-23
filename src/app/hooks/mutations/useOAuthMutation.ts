import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from '@/App';
import { makeOAuthService } from '@/app/factories/makeOAuthService';
import { makeUserService } from '@/app/factories/makeUserService';

export function useOAuthMutation() {
  const queryClient = useQueryClient();

  const oauthService = makeOAuthService();
  const usersService = makeUserService();

  const { mutate: authenticateFromGitHub, isPending: isAuthenticating } =
    useMutation({
      mutationFn: async (code: string) => {
        await oauthService.githubLogin(code);
      },
      onSuccess: async () => {
        const user = await usersService.me();
        queryClient.setQueryData(['activeUser'], user);

        router.navigate({ to: '/', replace: true });

        return user;
      },
      onError: (error) => {
        console.error('Error when authenticating', error);
      },
    });

  return {
    authenticateFromGitHub,
    isAuthenticating,
  };
}
