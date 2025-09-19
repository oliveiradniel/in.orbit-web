import githubIcon from '@/assets/icons/github.svg';
import logo from '@/assets/images/logo-in-orbit.svg';

import { Button } from '@/components/ui/Button';

export function SignInWithGitHub() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <img aria-hidden="true" src={logo} alt="" />

      <p className="max-w-80 text-center leading-relaxed text-zinc-300">
        Conclua suas metas semanais, ganhe experiência e suba de nível!
      </p>

      <Button type="button" variant="githubLogin">
        <img aria-hidden="true" src={githubIcon} alt="" className="size-6" />
        Entrar com GitHub
      </Button>
    </div>
  );
}
