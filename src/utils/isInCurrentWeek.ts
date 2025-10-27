import dayjs from 'dayjs';

export function isInCurrentWeek(date: Date | string) {
  return dayjs(date).endOf('week').isAfter(new Date());
}
