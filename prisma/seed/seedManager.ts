import { PrismaClient } from '@prisma/client';
import { defaultManagers } from '../utils/constants';

export default async function seedManagers(prisma: PrismaClient) {
  // create two dummy managers

  const managerResult = await prisma.manager.createMany({
    data: defaultManagers,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    managerResult,
  });
}
