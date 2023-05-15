import { PrismaClient } from '@prisma/client';
import { defaultOnlineLectures } from '../utils/constants';

export default async function seedOnlineLectures(prisma: PrismaClient) {
  // create two dummy onlineLectures
  const onlineLectureResult = await prisma.onlineLecture.createMany({
    data: defaultOnlineLectures,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    onlineLectureResult,
  });
}
