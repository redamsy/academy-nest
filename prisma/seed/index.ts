import { PrismaClient } from '@prisma/client';

import seedUserProfiles from './seedUserProfile';
import seedUserHashedPasswords from './seedUserHashedPassword';
import seedInstructors from './seedInstructor';
import seedProjects from './seedProject';
import seedAdmins from './seedAdmin';
import seedManagers from './seedManager';
import seedStudents from './seedStudent';
import seedInpersonStudents from './seedInpersonStudent';
import seedOnlineStudents from './seedOnlineStudent';
import seedLevels from './seedLevel';
import seedSubjects from './seedSubject';
import seedBranches from './seedBranch';
import seedRooms from './seedRoom';
import seedStudentProjects from './seedStudentProject';
import seedAssignments from './seedAssignment';
import seedStudentAssignments from './seedStudentAssignment';
import seedQuizes from './seedQuiz';
import seedStudentQuizes from './seedStudentQuiz';
import seedOnlineSchedules from './seedOnlineSchedule';
import seedInpersonSchedules from './seedInpersonSchedule';
import seedInpersonStudentSchedules from './seedInpersonStudentSchedule';
import seedOnlineLectures from './seedOnlineLecture';
import seedInpersonLectures from './seedInpersonLecture';
import seedInpersonAttendences from './seedInpersonAttendence';
import seedCourses from './seedCourse';

const prisma = new PrismaClient();

async function seed() {
  await prisma.inpersonAttendence.deleteMany();
  await prisma.inpersonLecture.deleteMany();
  await prisma.onlineLecture.deleteMany();
  await prisma.inpersonStudentSchedule.deleteMany();
  await prisma.inpersonSchedule.deleteMany();
  await prisma.onlineSchedule.deleteMany();
  await prisma.studentQuiz.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.studentAssignment.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.studentProject.deleteMany();
  await prisma.project.deleteMany();
  await prisma.room.deleteMany();
  await prisma.branch.deleteMany();
  await prisma.course.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.level.deleteMany();
  await prisma.onlineStudent.deleteMany();
  await prisma.inpersonStudent.deleteMany();
  await prisma.student.deleteMany();
  await prisma.manager.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.instructor.deleteMany();
  await prisma.userHashedPassword.deleteMany();
  await prisma.userProfile.deleteMany();

  await seedUserProfiles(prisma);
  await seedUserHashedPasswords(prisma);
  await seedInstructors(prisma);
  await seedAdmins(prisma);
  await seedInstructors(prisma);
  await seedManagers(prisma);
  await seedStudents(prisma);
  await seedInpersonStudents(prisma);
  await seedOnlineStudents(prisma);
  await seedLevels(prisma);
  await seedSubjects(prisma);
  await seedCourses(prisma);
  await seedBranches(prisma);
  await seedRooms(prisma);
  await seedProjects(prisma);
  await seedStudentProjects(prisma);
  await seedAssignments(prisma);
  await seedStudentAssignments(prisma);
  await seedQuizes(prisma);
  await seedStudentQuizes(prisma);
  await seedOnlineSchedules(prisma);
  await seedInpersonSchedules(prisma);
  await seedInpersonStudentSchedules(prisma);
  await seedOnlineLectures(prisma);
  await seedInpersonLectures(prisma);
  await seedInpersonAttendences(prisma);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
