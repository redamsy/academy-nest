import { PrismaClient } from '@prisma/client';
import { defaultUserHashedPasswords } from '../utils/constants';

export default async function seedUserHashedPasswords(prisma: PrismaClient) {
  // create dummy userHashedPasswords

  const userHashedpasswordResult = await prisma.userHashedPassword.createMany({
    data: defaultUserHashedPasswords,
    skipDuplicates: true, // Skip 'Bobo'
  });
  console.log({
    userHashedpasswordResult,
  });
}
