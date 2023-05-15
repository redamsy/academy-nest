import { PrismaClient } from '@prisma/client';
import { defaultAdmins } from '../utils/constants';

export default async function seedAdmins(prisma: PrismaClient) {
  // create two dummy admins

  const adminResult = await prisma.admin.createMany({
    data: defaultAdmins,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    adminResult,
  });
}
