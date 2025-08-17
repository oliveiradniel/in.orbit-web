import { CheckCircle2, Plus, PlusIcon } from 'lucide-react';

import { useId } from 'react';

import inOrbitIcon from '@/assets/images/in-orbit-icon.svg';

import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';
import { OutlineButton } from './ui/OutlineButton';
import { Progress, ProgressIndicator } from './ui/ProgressBar';
import { Separator } from './ui/Separator';

export function Summary() {
  const containerSummaryId = useId();

  return (
    <div className="mx-auto flex max-w-[480px] flex-col gap-6 px-5 py-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img aria-hidden="true" src={inOrbitIcon} alt="" />

          <span className="text-lg font-semibold">5 a 10 de agosto</span>
        </div>

        <Dialog.Trigger asChild>
          <Button type="button" size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </Dialog.Trigger>
      </header>

      <div className="flex flex-col gap-3">
        <Progress
          aria-label="Progresso semanal das metas"
          aria-valuenow={8}
          aria-valuemin={0}
          aria-valuemax={15}
          value={8}
          max={15}
        >
          <ProgressIndicator
            style={{
              width: '50%',
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">8</span> de{' '}
            <span className="text-zinc-100">15</span> metas nessa semana.
          </span>
          <span>50%</span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <PlusIcon aria-hidden="true" className="size-4 text-zinc-600" />{' '}
          Meditar
        </OutlineButton>

        <OutlineButton>
          <PlusIcon aria-hidden="true" className="size-4 text-zinc-600" /> Nadar
        </OutlineButton>

        <OutlineButton>
          <PlusIcon aria-hidden="true" className="size-4 text-zinc-600" />{' '}
          Praticar exercício
        </OutlineButton>

        <OutlineButton>
          <PlusIcon aria-hidden="true" className="size-4 text-zinc-600" /> Me
          alimentar bem
        </OutlineButton>
      </div>

      <main
        aria-labelledby={containerSummaryId}
        className="flex flex-col gap-6"
      >
        <h1 id={containerSummaryId} className="text-2xl font-medium">
          Sua semana
        </h1>

        <section className="flex flex-col gap-4">
          <h2 className="font-medium">
            Domingo{' '}
            <span className="text-sm text-zinc-400">(10 de Agosto)</span>
          </h2>

          <ul aria-label="Lista de metas" className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2
                aria-hidden="true"
                className="size-4 text-pink-500"
              />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{' '}
                <time dateTime="" className="text-zinc-100">
                  08:13h
                </time>
              </span>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2
                aria-hidden="true"
                className="size-4 text-pink-500"
              />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{' '}
                <time dateTime="" className="text-zinc-100">
                  08:13h
                </time>
              </span>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircle2
                aria-hidden="true"
                className="size-4 text-pink-500"
              />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{' '}
                <time dateTime="" className="text-zinc-100">
                  08:13h
                </time>
              </span>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-medium">
            Segunda-feira{' '}
            <span className="text-sm text-zinc-400">(10 de Agosto)</span>
          </h2>

          <ul aria-label="Lista de metas" className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2
                aria-hidden="true"
                className="size-4 text-pink-500"
              />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{' '}
                <time dateTime="" className="text-zinc-100">
                  08:13h
                </time>
              </span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
