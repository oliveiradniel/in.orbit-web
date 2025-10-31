import { LogOut, Trash2, X } from 'lucide-react';

import { useEffect } from 'react';

import { DeleteAccount } from '@/view/components/AlertDialog/DeleteAccountAlertDialog';
import { Dialog } from '@/view/components/Templates/Dialog';
import { Button } from '@/view/components/ui/Button';
import { toast } from '@/view/components/ui/Toast';

import type { ProfileDialogProps } from '../types';

import { useProfileController } from './useProfileController';

export function ProfileDialog({
  userData,
  isOpen,
  onClose,
}: ProfileDialogProps) {
  const {
    userLevelAndExperience,
    goals,
    totalActiveGoals,
    goalsCompletedCount,
    handleLogout,
    isLogouting,
    hasErrorGoalsCompletedCount,
  } = useProfileController();

  const {
    isDeleteAccountDialogOpen,
    handleOpenDeleteAccountDialog,
    handleCloseDeleteAccountDialog,
  } = DeleteAccount.useController();

  useEffect(() => {
    if (hasErrorGoalsCompletedCount) {
      toast({
        description:
          'Não foi possível buscar a quantidade total de metas completadas.',
        type: 'error',
      });
    }
  }, [hasErrorGoalsCompletedCount]);

  return (
    <>
      <DeleteAccount.AlertDialog
        isOpen={isDeleteAccountDialogOpen}
        onClose={handleCloseDeleteAccountDialog}
      />

      <Dialog
        hasAction={false}
        title="Configurações"
        description="Veja informações sobre seu perfil"
        toHide={['title', 'description']}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex h-full flex-col items-center">
          <img
            src={userData.avatarURL}
            alt={`Foto de perfil do usuário ${userData.name}`}
            className="h-22 w-22 rounded-full"
          />

          <div className="flex-1 space-y-10">
            <div className="flex flex-col items-center">
              <p className="text-xl text-violet-500">{userData.name}</p>
              <p className="text-xs text-zinc-500">{userData.email}</p>

              <div className="mt-6 flex gap-4 rounded-2xl border border-violet-500/40 px-4 py-2 text-zinc-500">
                <p className="text-sm">
                  Level: {userLevelAndExperience?.level ?? 1}
                </p>
                <p className="font-light text-violet-500/60">|</p>
                <p className="text-sm">
                  Experiência: {userLevelAndExperience?.experiencePoints ?? 0}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-18 w-18 items-center justify-center rounded-full border-4 border-purple-500">
                  <span className="text-center text-lg font-semibold text-zinc-400">
                    {hasErrorGoalsCompletedCount ? (
                      <X className="text-purple-500" />
                    ) : (
                      goalsCompletedCount
                    )}
                  </span>
                </div>
                <p className="text-xs font-semibold text-purple-500">
                  Total de metas concluídas
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-zinc-500">
                    <p>{goals?.length}</p>
                  </div>
                  <p className="max-w-[100px] text-center text-xs text-zinc-400">
                    Total de metas cadastradas
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-zinc-500">
                    <p>{totalActiveGoals}</p>
                  </div>
                  <p className="max-w-[100px] text-center text-xs text-zinc-400">
                    Total de metas ativas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Button
              type="button"
              variant="danger"
              disabled={isLogouting}
              className="w-full"
              onClick={handleOpenDeleteAccountDialog}
            >
              <Trash2 className="size-4" />
              Excluir conta
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={isLogouting}
              isLoading={isLogouting}
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
              Sair
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
