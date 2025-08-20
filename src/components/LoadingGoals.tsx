import logoInOrbit from '@/assets/images/logo-in-orbit.svg';

import { Spinner } from './ui/Spinner';

export function LoadingGoals() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <img aria-hidden="true" src={logoInOrbit} alt="" />

      <Spinner />
    </div>
  );
}
