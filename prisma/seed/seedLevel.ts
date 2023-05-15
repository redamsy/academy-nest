import { PrismaClient } from '@prisma/client';
import { defaultLevels } from '../utils/constants';

export default async function seedLevels(prisma: PrismaClient) {
  // create two dummy students

  const levelResult = await prisma.level.createMany({
    data: defaultLevels,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    levelResult,
  });
}
