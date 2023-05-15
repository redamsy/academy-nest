import { PrismaClient } from '@prisma/client';
import { defaultInpersonStudentSchedules } from '../utils/constants';

export default async function seedInpersonStudentSchedules(
  prisma: PrismaClient,
) {
  // create two dummy inpersonStudentSchedules
  const inpersonStudentScheduleResult =
    await prisma.inpersonStudentSchedule.createMany({
      data: defaultInpersonStudentSchedules,
      skipDuplicates: true, // Skip 'Bobo'
    });

  console.log({
    inpersonStudentScheduleResult,
  });
}
