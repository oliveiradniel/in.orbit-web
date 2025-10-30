import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { makeUserService } from '@/app/factories/makeUserService';
import { toast } from '@/view/components/ui/Toast';

export function useDeleteAccountMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const usersService = makeUserService();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => usersService.deleteAccount(),
    onSuccess: () => {
      queryClient.clear();

      sessionStorage.setItem('userLeft', JSON.stringify(true));
      navigate({ to: '/login' });

      toast({
        description: 'Conta excluída com sucesso.',
        type: 'success',
      });
    },
    onError: () => {
      toast({
        description: 'Não foi possível excluir sua conta.',
        type: 'error',
      });
    },
  });

  return {
    deleteAccount: mutate,
    isDeletingAccount: isPending,
    hasErrorDeleteAccount: isError,
  };
}
