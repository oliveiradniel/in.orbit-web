import { z } from 'zod';

export const CreateGoalSchema = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar.'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});
