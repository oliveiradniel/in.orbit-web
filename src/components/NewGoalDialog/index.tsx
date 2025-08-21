import { X } from 'lucide-react';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@/components/ui/RadioGroup';

import { useNewGoalDialogController } from './useNewGoalDialogController';

import { weeklyFrequencyOptions } from './weeklyFrequencyOptions';

export function NewGoalDialog() {
  const { inputTitleId, control, formErrors, register, handleSubmit } =
    useNewGoalDialogController();

  return (
    <Dialog.Portal>
      <Dialog.Overlay />

      <Dialog.Content className="data-[state=open]:animate-dialog-open data-[state=closed]:animate-dialog-close w-[400px] border-l border-zinc-900 bg-zinc-950">
        <div className="flex h-full flex-col gap-6">
          <header className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Dialog.Title>Cadastrar meta</Dialog.Title>

              <Dialog.Close asChild>
                <button
                  aria-label="Fechar"
                  type="button"
                  className="cursor-pointer"
                >
                  <X
                    aria-hidden="true"
                    className="size-5 text-zinc-600 transition-colors duration-300 ease-linear hover:text-zinc-700"
                  />
                </button>
              </Dialog.Close>
            </div>

            <Dialog.Description>
              Adicione atividades que te fazem bem e que você quer continuar
              praticando toda semana.
            </Dialog.Description>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor={inputTitleId}>Qual a atividade?</Label>
                <Input
                  {...register('title')}
                  id={inputTitleId}
                  autoFocus
                  placeholder="Praticar exercícios, meditar, etc..."
                  error={formErrors.title?.message}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Quantas vezes na semana?</Label>
                <Controller
                  control={control}
                  name="desiredWeeklyFrequency"
                  render={({ field: { value, onChange } }) => (
                    <RadioGroup
                      aria-label="Deseja praticar a atividade quantas vezes na semana?"
                      value={String(value)}
                      onValueChange={onChange}
                    >
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
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Dialog.Close asChild>
                <Button
                  aria-label="Fechar"
                  type="button"
                  variant="secondary"
                  className="flex-1"
                >
                  Fechar
                </Button>
              </Dialog.Close>
              <Button type="submit" className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
