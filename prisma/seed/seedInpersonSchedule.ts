import { PrismaClient } from '@prisma/client';
import { defaultInpersonSchedules } from '../utils/constants';

export default async function seedInpersonSchedules(prisma: PrismaClient) {
  // create two dummy inpersonSchedules
  const inpersonScheduleResult = await prisma.inpersonSchedule.createMany({
    data: defaultInpersonSchedules,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    inpersonScheduleResult,
  });
}
