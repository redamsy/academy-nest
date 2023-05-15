import { PrismaClient } from '@prisma/client';
import { defaultSubjects } from '../utils/constants';

export default async function seedSubjects(prisma: PrismaClient) {
  // create two dummy students

  const subjectResult = await prisma.subject.createMany({
    data: defaultSubjects,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    subjectResult,
  });
}
