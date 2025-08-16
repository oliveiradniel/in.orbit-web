import { Plus } from 'lucide-react';

import letsStart from '@/assets/images/lets-start-illustration.svg';
import logo from '@/assets/images/logo-in-orbit.svg';

export function EmptyGoals() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <img aria-hidden="true" src={logo} alt="" />
      <img aria-hidden="true" src={letsStart} alt="" />

      <p className="max-w-80 text-center leading-relaxed text-zinc-300">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <button
        type="button"
        className="flex cursor-pointer items-center gap-2 rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-medium tracking-tight text-violet-50 transition-colors duration-300 ease-linear hover:bg-violet-600"
      >
        <Plus className="size-4" />
        Cadastrar meta
      </button>
    </div>
  );
}
