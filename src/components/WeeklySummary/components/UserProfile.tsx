import { useEffect, useState } from 'react';

import type { UserResponse } from '@/@types/UserResponse';

import { queryClient } from '@/app/core/providers/queryClient';

import { UserLevel } from './UserLevel';

export function UserProfile() {
  const [user, setUser] = useState({} as UserResponse);

  useEffect(() => {
    const activeUser = queryClient.getQueryData(['activeUser']) as UserResponse;

    setUser(activeUser);
  }, []);

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-zinc-900 px-4 py-3">
      <div className="flex items-center gap-3">
        <img
          src={user.avatarURL}
          alt={`Avatar do ${user?.name || 'usuário'} no GitHub`}
          className="size-8 rounded-md"
        />

        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold">{user?.name}</span>
          <span className="text-[10px] text-zinc-400">
            {user?.email ?? 'Sem e-mail'}
          </span>
        </div>
      </div>

      <UserLevel />
    </div>
  );
}
