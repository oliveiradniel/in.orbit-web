import { z } from 'zod';

export const CreateGoalSchema = z.object({
  title: z.string().trim().min(1, 'Informe a atividade que deseja realizar.'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

export type GoalFormData = z.infer<typeof CreateGoalSchema>;
