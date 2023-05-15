import { PrismaClient } from '@prisma/client';
import { defaultUserProfiles } from '../utils/constants';

export default async function seedUserProfiles(prisma: PrismaClient) {
  // create dummy users

  const profileResult = await prisma.userProfile.createMany({
    data: defaultUserProfiles,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    profileResult,
  });
}
