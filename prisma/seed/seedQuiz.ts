import { PrismaClient } from '@prisma/client';
import { defaultQuizes } from '../utils/constants';

export default async function seedQuizes(prisma: PrismaClient) {
  // create two dummy quizs
  const quizResult = await prisma.quiz.createMany({
    data: defaultQuizes,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    quizResult,
  });
}
