import { DayOfWeek } from '@prisma/client';

const days = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

export const getWeekDay = (date: Date): DayOfWeek => {
  return days[date.getDay()];
};
