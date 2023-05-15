import { PrismaClient } from '@prisma/client';
import { defaultRooms } from '../utils/constants';

export default async function seedRooms(prisma: PrismaClient) {
  // create two dummy students

  const roomResult = await prisma.room.createMany({
    data: defaultRooms,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    roomResult,
  });
}
