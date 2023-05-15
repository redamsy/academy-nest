import { PrismaClient } from '@prisma/client';
import { defaultInpersonAttendences } from '../utils/constants';

export default async function seedInpersonAttendences(prisma: PrismaClient) {
  // create two dummy inpersonAttendences
  const inpersonAttendenceResult = await prisma.inpersonAttendence.createMany({
    data: defaultInpersonAttendences,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    inpersonAttendenceResult,
  });
}
