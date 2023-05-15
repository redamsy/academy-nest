import { PrismaClient } from '@prisma/client';
import { defaultCourses } from '../utils/constants';

export default async function seedCourses(prisma: PrismaClient) {
  // create two dummy students

  const courseResult = await prisma.course.createMany({
    data: defaultCourses,
    skipDuplicates: true, // Skip 'Bobo'
  });

  console.log({
    courseResult,
  });
}
