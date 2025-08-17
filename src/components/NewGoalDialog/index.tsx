import { X } from 'lucide-react';

import { useId } from 'react';

import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';

import { weeklyFrequencyOptions } from './weeklyFrequencyOptions';

interface DialogProps {
  isOpen: boolean;
  onClose(): void;
}

export function NewGoalDialog({ isOpen, onClose }: DialogProps) {
  const inputTitleId = useId();

  return (
    <Dialog.Root isOpen={isOpen} onClose={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content className="w-[400px] border-l border-zinc-900 bg-zinc-950">
          <div className="flex h-full flex-col gap-6">
            <header className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Dialog.Title>Cadastrar meta</Dialog.Title>

                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer"
                >
                  <X className="size-5 text-zinc-600 transition-colors duration-300 ease-linear hover:text-zinc-700" />
                </button>
              </div>

              <Dialog.Description>
                Adicione atividades que te fazem bem e que você quer continuar
                praticando toda semana.
              </Dialog.Description>
            </header>

            <form action="" className="flex flex-1 flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor={inputTitleId}>Qual a atividade?</Label>
                  <Input
                    id={inputTitleId}
                    autoFocus
                    placeholder="Praticar exercícios, meditar, etc..."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={inputTitleId}>Quantas vezes na semana?</Label>
                  <RadioGroup>
                    {weeklyFrequencyOptions.map(({ value, label, icon }) => (
                      <RadioGroupItem key={value} value={value}>
                        <RadioGroupIndicator />
                        <span className="text-sm leading-none font-medium text-zinc-300">
                          {label}
                        </span>
                        <span className="text-lg leading-none">{icon}</span>
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="secondary"
                  className="flex-1"
                >
                  Fechar
                </Button>
                <Button type="submit" className="flex-1">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
