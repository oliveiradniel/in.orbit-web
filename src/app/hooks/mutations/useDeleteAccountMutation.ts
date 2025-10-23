import { useMutation } from '@tanstack/react-query';
import { makeUserService } from '@/app/factories/makeUserService';

export function useDeleteAccountMutation() {
  const usersService = makeUserService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => usersService.deleteAccount(),
  });

  return {
    deleteAccount: mutateAsync,
    isDeleting: isPending,
  };
}
