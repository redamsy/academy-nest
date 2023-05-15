import { PrismaClient } from '@prisma/client';
import { defaultInpersonStudents } from '../utils/constants';

export default async function seedInpersonStudents(prisma: PrismaClient) {
  // create two dummy students

  const inpersonStudentResult = await prisma.inpersonStudent.createMany({
    data: defaultInpersonStudents,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    inpersonStudentResult,
  });
}
