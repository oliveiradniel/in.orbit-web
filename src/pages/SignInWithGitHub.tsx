import { Link } from '@tanstack/react-router';

import githubIcon from '@/assets/icons/github.svg';
import logo from '@/assets/images/logo-in-orbit.svg';

import { Button } from '@/components/ui/Button';

import { env } from '@/config/env';

export function SignInWithGitHub() {
  const githubURL = new URL('http://github.com/login/oauth/authorize');

  githubURL.searchParams.set('client_id', env.GITHUB_CLIENT_ID);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <img aria-hidden="true" src={logo} alt="" />

      <p className="max-w-80 text-center leading-relaxed text-zinc-300">
        Conclua suas metas semanais, ganhe experiência e suba de nível!
      </p>

      <Button type="button" variant="githubLogin">
        <Link to={githubURL.toString()} className="flex items-center gap-2">
          <img aria-hidden="true" src={githubIcon} alt="" className="size-6" />
          Entrar com GitHub
        </Link>
      </Button>
    </div>
  );
}
