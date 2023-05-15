import { PrismaClient } from '@prisma/client';
import { defaultBranches } from '../utils/constants';

export default async function seedBranches(prisma: PrismaClient) {
  // create two dummy students

  const branchResult = await prisma.branch.createMany({
    data: defaultBranches,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    branchResult,
  });
}
