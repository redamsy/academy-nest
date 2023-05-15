import { PrismaClient } from '@prisma/client';
import { defaultInstructors } from '../utils/constants';

export default async function seedInstructors(prisma: PrismaClient) {
  // create two dummy instructors

  const instructorResult = await prisma.instructor.createMany({
    data: defaultInstructors,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    instructorResult,
  });
}
