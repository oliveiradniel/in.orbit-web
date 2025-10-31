import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { makeOAuthService } from '@/app/factories/makeOAuthService';

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const oauthService = makeOAuthService();

  const { mutate, isPending } = useMutation({
    mutationFn: () => oauthService.logout(),
    onSuccess: () => {
      queryClient.clear();

      sessionStorage.setItem('isLoggingOut', JSON.stringify(true));
      sessionStorage.setItem('userLeft', JSON.stringify(true));
      navigate({ to: '/login' });
    },
  });

  return { logout: mutate, isLogouting: isPending };
}
