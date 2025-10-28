import { useMutation, useQueryClient } from '@tanstack/react-query';

import { router } from '@/App';

import { makeOAuthService } from '@/app/factories/makeOAuthService';
import { makeUserService } from '@/app/factories/makeUserService';

import { toast } from '@/view/components/ui/Toast';

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
      },
      onError: () => {
        router.navigate({ to: '/login', replace: true });

        toast({
          description:
            'Não foi possível realizar login com GitHub. Tente novamente mais tarde.',
          type: 'error',
        });
      },
    });

  return {
    authenticateFromGitHub,
    isAuthenticating,
  };
}
