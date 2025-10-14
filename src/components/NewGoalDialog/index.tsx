import { Controller } from 'react-hook-form';

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
    requestErrorMessage,
    isCreationGoal,
    register,
    handleSubmit,
    clearRequestErrorMessage,
  } = useNewGoalDialogController();

  return (
    <DialogTemplate
      hasAction
      isSubmitting={isCreationGoal}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Cadastrar meta"
      description="Adicione atividades que te fazem bem e que você quer continuar praticando toda semana."
    >
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor={inputTitleId}>Qual a atividade?</Label>
            <Input
              {...register('title', {
                onChange: () => {
                  if (requestErrorMessage) {
                    clearRequestErrorMessage();
                  }
                },
              })}
              id={inputTitleId}
              autoFocus
              placeholder="Praticar exercícios, meditar, etc..."
              error={formErrors.title?.message || requestErrorMessage}
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
      </form>
    </DialogTemplate>
  );
}
