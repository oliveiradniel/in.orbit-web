import { useMutation } from '@tanstack/react-query';
import { makeOAuthService } from '@/app/factories/makeOAuthService';

export function useLogoutMutation() {
  const oauthService = makeOAuthService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => oauthService.logout(),
  });

  return { logout: mutateAsync, isLogouting: isPending };
}
