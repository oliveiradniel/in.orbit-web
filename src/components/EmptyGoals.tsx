import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { LogOut, Plus } from 'lucide-react';

import { useLogoutMutation } from '@/app/hooks/mutations/useLogoutMutation';

import letsStart from '@/assets/images/lets-start-illustration.svg';
import logo from '@/assets/images/logo-in-orbit.svg';

import { Button } from '@/components/ui/Button';

interface EmptyGoalsProps {
  onOpenNewGoalDialog: () => void;
}

export function EmptyGoals({ onOpenNewGoalDialog }: EmptyGoalsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { logout, isLogouting } = useLogoutMutation();

  async function handleLogout() {
    await logout();
    queryClient.clear();

    sessionStorage.setItem('userLeft', JSON.stringify(true));
    navigate({ to: '/login' });
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <img aria-hidden="true" src={logo} alt="" />
      <img aria-hidden="true" src={letsStart} alt="" />

      <p className="max-w-80 text-center leading-relaxed text-zinc-300">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
        mesmo?
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          disabled={isLogouting}
          onClick={onOpenNewGoalDialog}
        >
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={isLogouting}
          isLoading={isLogouting}
          onClick={() => handleLogout()}
        >
          <LogOut className="size-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}
