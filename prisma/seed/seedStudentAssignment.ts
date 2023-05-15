import { PrismaClient } from '@prisma/client';
import { defaultStudentAssignments } from '../utils/constants';

export default async function seedStudentAssignments(prisma: PrismaClient) {
  // create two dummy projects
  const projectResult = await prisma.studentAssignment.createMany({
    data: defaultStudentAssignments,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    projectResult,
  });
}
