import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { LogOut } from 'lucide-react';

import { useState } from 'react';
import { useLogoutMutation } from '@/app/hooks/mutations/useLogoutMutation';
import { useGetAllGoalsQuery } from '@/app/hooks/queries/useGetAllGoalsQuery';

import errorIllustration from '@/assets/images/error-illustration.svg';
import logo from '@/assets/images/logo-in-orbit.svg';

import { Button } from '@/view/components/ui/Button';

export function ErrorGoals() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const { isLoadingAllGoals } = useGetAllGoalsQuery({
    enabled: isQueryEnabled,
  });
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
      <img
        aria-hidden="true"
        src={errorIllustration}
        width={600}
        height={600}
        alt=""
      />

      <p className="max-w-80 text-center leading-relaxed text-zinc-300">
        Não foi possível buscar suas metas. Tente novamente mais tarde.
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="danger"
          disabled={isLoadingAllGoals}
          onClick={() => setIsQueryEnabled(true)}
        >
          Tentar novamente
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
