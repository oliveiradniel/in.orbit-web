import dayjs from 'dayjs';
import z from 'zod';

export const DashboardSearchSchema = z.object({
  weekStartsAt: z
    .string()
    .optional()
    .transform((date) => {
      return dayjs(date).format('YYYY-MM-DD');
    }),
});
