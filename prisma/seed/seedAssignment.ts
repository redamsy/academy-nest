import { PrismaClient } from '@prisma/client';
import { defaultAssignments } from '../utils/constants';

export default async function seedAssignments(prisma: PrismaClient) {
  // create two dummy assignments
  const assignmentResult = await prisma.assignment.createMany({
    data: defaultAssignments,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    assignmentResult,
  });
}
