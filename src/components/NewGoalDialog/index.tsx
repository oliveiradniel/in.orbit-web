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
import { DialogTemplate } from '../TemplateDialog';

import { useNewGoalDialogController } from './useNewGoalDialogController';

import { weeklyFrequencyOptions } from './weeklyFrequencyOptions';

interface NewGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewGoalDialog({ isOpen, onClose }: NewGoalDialogProps) {
  const {
    inputTitleId,
    control,
    formErrors,
    isCreationGoal,
    register,
    handleSubmit,
  } = useNewGoalDialogController();

  return (
    <DialogTemplate
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar meta"
      description="Adicione atividades que te fazem bem e que você quer continuar praticando toda semana."
    >
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
          <Button type="submit" isLoading={isCreationGoal} className="flex-1">
            Salvar
          </Button>
        </div>
      </form>
    </DialogTemplate>
  );
}
