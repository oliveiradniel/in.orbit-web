import dayjs from 'dayjs';
import z from 'zod';

export const DashboardSearchSchema = z.object({
  weekStartsAt: z
    .string()
    .transform((date) => {
      return dayjs(date).format('YYYY-MM-DD');
    })
    .default(dayjs().format('YYYY-MM-DD')),
});
