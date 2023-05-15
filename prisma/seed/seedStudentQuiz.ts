import { PrismaClient } from '@prisma/client';
import { defaultStudentQuizes } from '../utils/constants';

export default async function seedStudentQuizse(prisma: PrismaClient) {
  // create two dummy studentQuizs
  const studentQuizResult = await prisma.studentQuiz.createMany({
    data: defaultStudentQuizes,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    studentQuizResult,
  });
}
