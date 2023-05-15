import {
  Admin,
  Assignment,
  AssignmentType,
  Branch,
  Course,
  InpersonAttendence,
  InpersonLecture,
  InpersonSchedule,
  InpersonStudent,
  InpersonStudentSchedule,
  Instructor,
  Level,
  Manager,
  OnlineLecture,
  OnlineSchedule,
  OnlineStudent,
  Prisma,
  Project,
  Quiz,
  Room,
  Student,
  StudentAssignment,
  StudentProject,
  StudentQuiz,
  Subject,
  UserHashedPassword,
  UserProfile,
  Role,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import * as moment from 'moment';
import { v4 as uuidV4 } from 'uuid';
import { getWeekDay } from '../../src/Utils/DateTime';
import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcrypt';

const dateToday = moment.utc(new Date().toUTCString());
const dateYesterday = moment.utc(new Date().toUTCString()).subtract(1, 'day');
const dateTomorrow = moment.utc(new Date().toUTCString()).add(1, 'day');
const dateBefore20Y = moment.utc(new Date().toUTCString()).subtract(20, 'year');
const date51 = moment.utc(new Date('2023-05-01').toUTCString()); //Mon
const date52 = moment.utc(new Date('2023-05-02').toUTCString()); //Tues
const date53 = moment.utc(new Date('2023-05-03').toUTCString()); // Wed
const date54 = moment.utc(new Date('2023-05-03').toUTCString()); // Thu

export const defaultUsers: {
  userId: string;
  userName: string;
  email: string;
  name: string;
  DOB: Date;
  password: string;
  role: Role;
  ratePerHour?: Decimal; //for instructor or online student
}[] = [
  {
    userId: 'user1',
    userName: 'john',
    email: 'john@gmail.com',
    name: 'john',
    DOB: dateBefore20Y.toDate(),
    password: 'pass',
    role: Role.SYSTEM_ADMIN,
  },
  {
    userId: 'user2',
    userName: 'jane',
    email: 'jane@gmail.com',
    name: 'jane',
    DOB: dateBefore20Y.toDate(),
    password: 'pass',
    role: Role.MANAGER,
  },
  {
    userId: 'user3',
    userName: 'bob',
    email: 'bob@gmail.com',
    name: 'bob',
    DOB: dateBefore20Y.toDate(),
    password: 'pass',
    ratePerHour: new Prisma.Decimal(30),
    role: Role.INSTRUCTOR,
  },
  {
    userId: 'user4',
    userName: 'shane',
    email: 'shane@gmail.com',
    name: 'shane',
    DOB: dateBefore20Y.toDate(),
    password: 'pass',
    ratePerHour: new Prisma.Decimal(30),
    role: Role.INSTRUCTOR,
  },
  {
    userId: 'user5',
    userName: 'alex',
    email: 'alex@gmail.com',
    name: 'Alexandra',
    DOB: dateBefore20Y.toDate(),
    password: 'pass',
    role: Role.INPERSON_STUDENT,
  },
  {
    userId: 'user6',
    userName: 'charlie',
    email: 'charlie@gmail.com',
    name: 'charlie',
    DOB: dateBefore20Y.toDate(),
    password: 'pass',
    role: Role.INPERSON_STUDENT,
  },
  {
    userId: 'user7',
    userName: 'sam',
    email: 'sam@gmail.com',
    name: 'Sam',
    DOB: dateBefore20Y.toDate(),
    password: 'pass',
    ratePerHour: new Prisma.Decimal(12),
    role: Role.ONLINE_STUDENT,
  },
];

export const defaultUserProfiles: Omit<
  UserProfile,
  'createdAt' | 'updatedAt'
>[] = defaultUsers.map((user) => {
  return {
    userId: user.userId,
    userName: user.userName,
    email: user.email,
    name: user.name,
    DOB: user.DOB,
    role: user.role,
  };
});

export const defaultUserHashedPasswords: Omit<
  UserHashedPassword,
  'createdAt' | 'updatedAt'
>[] = defaultUsers.map((user) => {
  const salt = genSaltSync(10);
  return {
    userId: user.userId,
    email: user.email,
    hashedPassword: hashSync(user.password, salt),
  };
});

export const defaultAdmins: Admin[] = defaultUsers
  .filter((user) => user.role === Role.SYSTEM_ADMIN)
  .map((user) => {
    return {
      userId: user.userId,
    };
  });

export const defaultManagers: Manager[] = defaultUsers
  .filter((user) => user.role === Role.MANAGER)
  .map((user) => {
    return {
      userId: user.userId,
    };
  });

export const defaultInstructors: Instructor[] = defaultUsers
  .filter((user) => user.role === Role.INSTRUCTOR)
  .map((user) => {
    return {
      userId: user.userId,
      ratePerHour: user.ratePerHour,
    };
  });

export const defaultStudents: Student[] = defaultUsers
  .filter(
    (user) =>
      user.role === Role.INPERSON_STUDENT || user.role === Role.ONLINE_STUDENT,
  )
  .map((user) => {
    return {
      userId: user.userId,
    };
  });

export const defaultInpersonStudents: InpersonStudent[] = defaultUsers
  .filter((user) => user.role === Role.INPERSON_STUDENT)
  .map((user) => {
    return {
      studentId: user.userId,
    };
  });

export const defaultOnlineStudents: OnlineStudent[] = defaultUsers
  .filter((user) => user.role === Role.ONLINE_STUDENT)
  .map((user) => {
    return {
      studentId: user.userId,
      ratePerHour: user.ratePerHour,
    };
  });

export const defaultLevels: Level[] = [
  {
    id: uuidV4(),
    name: 'A',
  },
  {
    id: uuidV4(),
    name: 'B',
  },
  {
    id: uuidV4(),
    name: 'C',
  },
  {
    id: uuidV4(),
    name: 'D',
  },
];

export const defaultSubjects: Subject[] = [
  {
    id: uuidV4(),
    name: 'Math',
  },
  {
    id: uuidV4(),
    name: 'Physics',
  },
  {
    id: uuidV4(),
    name: 'English',
  },
  {
    id: uuidV4(),
    name: 'Computer',
  },
];

export const defaultCourses: Course[] = [
  {
    id: uuidV4(),
    price: new Prisma.Decimal(60),
    numberOfHours: 12,
    levelId: defaultLevels[0].id,
    subjectId: defaultSubjects[0].id,
  },
  {
    id: uuidV4(),
    price: new Prisma.Decimal(60),
    numberOfHours: 12,
    levelId: defaultLevels[0].id,
    subjectId: defaultSubjects[0].id,
  },
];

export const defaultBranches: Branch[] = [
  {
    id: uuidV4(),
    name: 'Beirut',
  },
  {
    id: uuidV4(),
    name: 'South',
  },
  {
    id: uuidV4(),
    name: 'North',
  },
  {
    id: uuidV4(),
    name: 'Mountain',
  },
];

export const defaultRooms: Room[] = [
  {
    id: uuidV4(),
    name: 'R-101',
    branchId: defaultBranches[0].id,
  },
  {
    id: uuidV4(),
    name: 'R-102',
    branchId: defaultBranches[0].id,
  },
  {
    id: uuidV4(),
    name: 'R-103',
    branchId: defaultBranches[0].id,
  },
  {
    id: uuidV4(),
    name: 'R-104',
    branchId: defaultBranches[0].id,
  },
];

export const defaultProjects: Project[] = [
  {
    id: uuidV4(),
    name: 'task1',
    description:
      "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    date: dateToday.toDate(),
    questionPdfUrl: 'url',
    instructorId: defaultInstructors[0].userId,
  },
  {
    id: uuidV4(),
    name: 'task2',
    description:
      "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    date: dateTomorrow.toDate(),
    questionPdfUrl: 'url',
    instructorId: defaultInstructors[0].userId,
  },
];

export const defaultStudentProjects: StudentProject[] = [
  {
    grade: null,
    answerPdfUrl: 'url',
    studentId: defaultOnlineStudents[0].studentId,
    projectId: defaultProjects[0].id,
  },
  {
    grade: null,
    answerPdfUrl: 'url',
    studentId: defaultInpersonStudents[0].studentId,
    projectId: defaultProjects[0].id,
  },
  {
    grade: null,
    answerPdfUrl: 'url',
    studentId: defaultInpersonStudents[1].studentId,
    projectId: defaultProjects[1].id,
  },
];

export const defaultQuizes: Quiz[] = [
  {
    id: uuidV4(),
    name: 'R-101',
    description: '',
    questionPdfUrl: 'url',
    date: dateYesterday.toDate(),
    instructorId: defaultInstructors[0].userId,
  },
  {
    id: uuidV4(),
    name: 'R-102',
    description: '',
    questionPdfUrl: 'url',
    date: dateYesterday.toDate(),
    instructorId: defaultInstructors[0].userId,
  },
  {
    id: uuidV4(),
    name: 'R-103',
    description: '',
    questionPdfUrl: 'url',
    date: dateYesterday.toDate(),
    instructorId: defaultInstructors[0].userId,
  },
  {
    id: uuidV4(),
    name: 'R-104',
    description: '',
    questionPdfUrl: 'url',
    date: dateYesterday.toDate(),
    instructorId: defaultInstructors[0].userId,
  },
];

export const defaultStudentQuizes: StudentQuiz[] = [
  {
    grade: null,
    answerPdfUrl: 'url',
    studentId: defaultOnlineStudents[0].studentId,
    quizId: defaultQuizes[0].id,
  },
  {
    grade: null,
    answerPdfUrl: 'url',
    studentId: defaultInpersonStudents[1].studentId,
    quizId: defaultQuizes[1].id,
  },
  {
    grade: null,
    answerPdfUrl: 'url',
    studentId: defaultInpersonStudents[1].studentId,
    quizId: defaultQuizes[1].id,
  },
];

export const defaultAssignments: Assignment[] = [
  {
    id: uuidV4(),
    name: 'R-101',
    description: '',
    questionPdfUrl: 'url',
    date: dateYesterday.toDate(),
    instructorId: defaultInstructors[0].userId,
  },
  {
    id: uuidV4(),
    name: 'R-102',
    description: '',
    questionPdfUrl: 'url',
    date: dateYesterday.toDate(),
    instructorId: defaultInstructors[0].userId,
  },
  {
    id: uuidV4(),
    name: 'R-103',
    description: '',
    questionPdfUrl: 'url',
    date: dateYesterday.toDate(),
    instructorId: defaultInstructors[0].userId,
  },
  {
    id: uuidV4(),
    name: 'R-104',
    description: '',
    questionPdfUrl: 'url',
    date: dateYesterday.toDate(),
    instructorId: defaultInstructors[0].userId,
  },
];

export const defaultStudentAssignments: StudentAssignment[] = [
  {
    grade: null,
    type: AssignmentType.HOME,
    answerPdfUrl: 'url',
    studentId: defaultOnlineStudents[0].studentId,
    assignmentId: defaultAssignments[0].id,
  },
  {
    grade: null,
    answerPdfUrl: 'url',
    type: AssignmentType.CLASS,
    studentId: defaultInpersonStudents[1].studentId,
    assignmentId: defaultAssignments[1].id,
  },
  {
    grade: null,
    answerPdfUrl: 'url',
    type: AssignmentType.CLASS,
    studentId: defaultInpersonStudents[1].studentId,
    assignmentId: defaultAssignments[1].id,
  },
];

//instructorId and time should not intersect , even with the other tables
//roomId and time should not intersect , even with the other tables
export const defaultInpersonSchedules: InpersonSchedule[] = [
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 9, 0, 0)), // 9:00 AM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 11, 0, 0)), // 11:00 PM UTC
    dayOfWeek: getWeekDay(date51.toDate()),
    instructorId: defaultInstructors[0].userId,
    courseId: defaultCourses[0].id,
    roomId: defaultRooms[0].id,
  },
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 9, 0, 0)), // 9:00 AM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 11, 0, 0)), // 11:00 PM UTC
    dayOfWeek: getWeekDay(date51.toDate()),
    instructorId: defaultInstructors[1].userId, // same instructor can't teach same time as above
    courseId: defaultCourses[0].id, // another instructor can teach same course as above
    roomId: defaultRooms[1].id, // another instructor can't teach same room&time as above
  },
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 11, 0, 0)), // 11:00 AM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 13, 0, 0)), // 1:00 PM UTC
    dayOfWeek: getWeekDay(date51.toDate()),
    instructorId: defaultInstructors[0].userId,
    courseId: defaultCourses[0].id,
    roomId: defaultRooms[0].id,
  },
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 13, 0, 0)), // 1:00 PM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 15, 0, 0)), // 3:00 PM UTC
    dayOfWeek: getWeekDay(date51.toDate()),
    instructorId: defaultInstructors[0].userId,
    courseId: defaultCourses[0].id,
    roomId: defaultRooms[0].id,
  },
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 9, 0, 0)), // 9:00 AM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 17, 0, 0)), // 5:00 PM UTC
    dayOfWeek: getWeekDay(date52.toDate()),
    instructorId: defaultInstructors[0].userId,
    courseId: defaultCourses[0].id,
    roomId: defaultRooms[0].id,
  },
];

//instructorId and time should not intersect , even with the other tables
//studentId and time should not intersect
// meaning same intructor can't teach 2 students at the same time
// meaning same student can't be taught by 2 intructors at the same time
export const defaultOnlineSchedules: OnlineSchedule[] = [
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 9, 0, 0)), // 9:00 AM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 11, 0, 0)), // 11:00 PM UTC
    dayOfWeek: getWeekDay(date53.toDate()),
    zoomLink: 'url',
    instructorId: defaultInstructors[0].userId,
    courseId: defaultCourses[0].id,
    onlineStudentId: defaultOnlineStudents[0].studentId,
  },
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 11, 0, 0)), // 11:00 AM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 13, 0, 0)), // 1:00 PM UTC
    dayOfWeek: getWeekDay(date53.toDate()),
    zoomLink: 'url',
    instructorId: defaultInstructors[0].userId,
    courseId: defaultCourses[0].id,
    onlineStudentId: defaultOnlineStudents[0].studentId,
  },
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 13, 0, 0)), // 1:00 PM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 15, 0, 0)), // 3:00 PM UTC
    dayOfWeek: getWeekDay(date53.toDate()),
    zoomLink: 'url',
    instructorId: defaultInstructors[0].userId,
    courseId: defaultCourses[0].id,
    onlineStudentId: defaultOnlineStudents[0].studentId,
  },
  {
    id: uuidV4(),
    startTime: new Date(Date.UTC(0, 0, 0, 9, 0, 0)), // 9:00 AM UTC
    endTime: new Date(Date.UTC(0, 0, 0, 17, 0, 0)), // 5:00 PM UTC
    dayOfWeek: getWeekDay(date54.toDate()),
    zoomLink: 'url',
    instructorId: defaultInstructors[0].userId,
    courseId: defaultCourses[0].id,
    onlineStudentId: defaultOnlineStudents[0].studentId,
  },
];

// studentId and time should not intersect with another entry
// meaning same student can't be in 2 places at the same time
export const defaultInpersonStudentSchedules: InpersonStudentSchedule[] = [
  {
    inpersonScheduleId: defaultInpersonSchedules[0].id,
    inpersonStudentId: defaultInpersonStudents[0].studentId,
  },
  {
    inpersonScheduleId: defaultInpersonSchedules[2].id,
    inpersonStudentId: defaultInpersonStudents[0].studentId,
  },
  {
    inpersonScheduleId: defaultInpersonSchedules[3].id,
    inpersonStudentId: defaultInpersonStudents[0].studentId,
  },
  {
    inpersonScheduleId: defaultInpersonSchedules[1].id,
    inpersonStudentId: defaultInpersonStudents[1].studentId,
  },
];

export const defaultInpersonLectures: InpersonLecture[] = [
  {
    id: uuidV4(),
    dateWithoutTime: date51.toDate(), // Monday 1/may/2023 <=> relativeto inpersonSchedule
    pdfUrl: 'url',
    hasInstructorAttended: true,
    inpersonScheduleId: defaultInpersonSchedules[0].id,
  },
];

export const defaultOnlineLectures: OnlineLecture[] = [
  {
    id: uuidV4(),
    dateWithoutTime: date53.toDate(), // Wednesday 3/may/2023 <=> relative to onlineSchedule
    pdfUrl: 'url',
    hasInstructorAttended: true,
    hasStudentAttended: true,
    onlineScheduleId: defaultOnlineSchedules[0].id,
  },
];

export const defaultInpersonAttendences: InpersonAttendence[] = [
  {
    hasStudentAttended: true,
    inpersonStudentId: defaultInpersonStudents[0].studentId,
    inpersonLectureId: defaultInpersonLectures[0].id,
  },
];
