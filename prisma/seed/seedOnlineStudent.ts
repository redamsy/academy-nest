import { PrismaClient } from '@prisma/client';
import { defaultOnlineStudents } from '../utils/constants';

export default async function seedOnlineStudents(prisma: PrismaClient) {
  // create two dummy students

  const onlineStudentResult = await prisma.onlineStudent.createMany({
    data: defaultOnlineStudents,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    onlineStudentResult,
  });
}
