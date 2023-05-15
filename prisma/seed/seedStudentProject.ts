import { PrismaClient } from '@prisma/client';
import { defaultStudentProjects } from '../utils/constants';

export default async function seedStudentProjects(prisma: PrismaClient) {
  // create two dummy studentProjects
  const studentProjectResult = await prisma.studentProject.createMany({
    data: defaultStudentProjects,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    studentProjectResult,
  });
}
