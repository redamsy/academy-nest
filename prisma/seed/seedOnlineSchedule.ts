import { PrismaClient } from '@prisma/client';
import { defaultOnlineSchedules } from '../utils/constants';

export default async function seedOnlineSchedules(prisma: PrismaClient) {
  // create two dummy onlineSchedules
  const onlineScheduleResult = await prisma.onlineSchedule.createMany({
    data: defaultOnlineSchedules,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    onlineScheduleResult,
  });
}
