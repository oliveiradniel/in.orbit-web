import { Plus } from 'lucide-react';

import letsStart from '@/assets/images/lets-start-illustration.svg';
import logo from '@/assets/images/logo-in-orbit.svg';

import { NewGoalDialog } from '@/components/NewGoalDialog';
import { Button } from '@/components/ui/Button';

import { useEmptyGoalsController } from './useEmptyGoalsController';

export function EmptyGoals() {
  const { isDialogOpen, handleOpenDialog, handleCloseDialog } =
    useEmptyGoalsController();

  return (
    <>
      <NewGoalDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />

      <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
        <img aria-hidden="true" src={logo} alt="" />
        <img aria-hidden="true" src={letsStart} alt="" />

        <p className="max-w-80 text-center leading-relaxed text-zinc-300">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
          mesmo?
        </p>

        <Button type="button" onClick={handleOpenDialog}>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </div>
    </>
  );
}
