import logoInOrbit from '@/assets/images/logo-in-orbit.svg';

export function LoadingGoals() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <img aria-hidden="true" src={logoInOrbit} alt="" />

      <div className="h-10 w-10 animate-spin rounded-full border-l-3 border-pink-500" />
    </div>
  );
}
