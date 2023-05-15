import { PrismaClient } from '@prisma/client';
import { defaultProjects } from '../utils/constants';

export default async function seedProjects(prisma: PrismaClient) {
  // create two dummy projects
  const projectResult = await prisma.project.createMany({
    data: defaultProjects,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    projectResult,
  });
}
