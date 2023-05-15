import { PrismaClient } from '@prisma/client';
import { defaultInpersonLectures } from '../utils/constants';

export default async function seedInpersonLectures(prisma: PrismaClient) {
  // create two dummy inpersonLectures
  const inpersonLectureResult = await prisma.inpersonLecture.createMany({
    data: defaultInpersonLectures,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    inpersonLectureResult,
  });
}
