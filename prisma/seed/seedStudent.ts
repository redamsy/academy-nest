import { PrismaClient } from '@prisma/client';
import { defaultStudents } from '../utils/constants';

export default async function seedStudents(prisma: PrismaClient) {
  // create two dummy students

  const studentResult = await prisma.student.createMany({
    data: defaultStudents,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    studentResult,
  });
}
