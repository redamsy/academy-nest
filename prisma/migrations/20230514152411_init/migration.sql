-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('CLASS', 'HOME');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SYSTEM_ADMIN', 'MANAGER', 'INSTRUCTOR', 'ONLINE_STUDENT', 'INPERSON_STUDENT');

-- CreateTable
CREATE TABLE "UserProfile" (
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "DOB" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role",

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserHashedPassword" (
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserHashedRefreshJWT" (
    "email" TEXT NOT NULL,
    "hashedRefreshJWT" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Manager" (
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Instructor" (
    "userId" TEXT NOT NULL,
    "ratePerHour" MONEY NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OnlineStudent" (
    "studentId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InpersonStudent" (
    "studentId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Level" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL,
    "price" MONEY NOT NULL,
    "numberOfHours" INTEGER NOT NULL,
    "levelId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "branchId" UUID NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "date" DATE NOT NULL,
    "questionPdfUrl" VARCHAR(2000) NOT NULL,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProject" (
    "grade" DECIMAL(9,2),
    "answerPdfUrl" VARCHAR(2000) NOT NULL,
    "studentId" TEXT NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "StudentProject_pkey" PRIMARY KEY ("studentId","projectId")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "date" DATE NOT NULL,
    "questionPdfUrl" VARCHAR(2000) NOT NULL,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentQuiz" (
    "grade" DECIMAL(9,2),
    "answerPdfUrl" VARCHAR(2000) NOT NULL,
    "studentId" TEXT NOT NULL,
    "quizId" UUID NOT NULL,

    CONSTRAINT "StudentQuiz_pkey" PRIMARY KEY ("studentId","quizId")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "date" DATE NOT NULL,
    "questionPdfUrl" VARCHAR(2000) NOT NULL,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAssignment" (
    "grade" DECIMAL(9,2),
    "type" "AssignmentType" NOT NULL DEFAULT 'CLASS',
    "answerPdfUrl" VARCHAR(2000) NOT NULL,
    "studentId" TEXT NOT NULL,
    "assignmentId" UUID NOT NULL,

    CONSTRAINT "StudentAssignment_pkey" PRIMARY KEY ("studentId","assignmentId")
);

-- CreateTable
CREATE TABLE "InpersonSchedule" (
    "id" UUID NOT NULL,
    "startTime" DATE NOT NULL,
    "endTime" DATE NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL DEFAULT 'MONDAY',
    "courseId" UUID NOT NULL,
    "instructorId" TEXT NOT NULL,
    "roomId" UUID NOT NULL,

    CONSTRAINT "InpersonSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnlineSchedule" (
    "id" UUID NOT NULL,
    "zoomLink" VARCHAR(2000) NOT NULL,
    "startTime" DATE NOT NULL,
    "endTime" DATE NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "courseId" UUID NOT NULL,
    "instructorId" TEXT NOT NULL,
    "onlineStudentId" TEXT NOT NULL,

    CONSTRAINT "OnlineSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InpersonStudentSchedule" (
    "inpersonStudentId" TEXT NOT NULL,
    "inpersonScheduleId" UUID NOT NULL,

    CONSTRAINT "InpersonStudentSchedule_pkey" PRIMARY KEY ("inpersonStudentId","inpersonScheduleId")
);

-- CreateTable
CREATE TABLE "InpersonLecture" (
    "id" UUID NOT NULL,
    "dateWithoutTime" DATE NOT NULL,
    "pdfUrl" VARCHAR(2000) NOT NULL,
    "hasInstructorAttended" BOOLEAN NOT NULL DEFAULT false,
    "inpersonScheduleId" UUID NOT NULL,

    CONSTRAINT "InpersonLecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnlineLecture" (
    "id" UUID NOT NULL,
    "dateWithoutTime" DATE NOT NULL,
    "pdfUrl" VARCHAR(2000) NOT NULL,
    "hasInstructorAttended" BOOLEAN NOT NULL DEFAULT false,
    "hasStudentAttended" BOOLEAN NOT NULL DEFAULT false,
    "onlineScheduleId" UUID NOT NULL,

    CONSTRAINT "OnlineLecture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InpersonAttendence" (
    "hasStudentAttended" BOOLEAN NOT NULL DEFAULT false,
    "inpersonStudentId" TEXT NOT NULL,
    "inpersonLectureId" UUID NOT NULL,

    CONSTRAINT "InpersonAttendence_pkey" PRIMARY KEY ("inpersonStudentId","inpersonLectureId")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "pdfUrl" VARCHAR(2000) NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" UUID NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("studentId","courseId")
);

-- CreateTable
CREATE TABLE "Discount" (
    "discount" DECIMAL(9,2) NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" UUID NOT NULL,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("studentId","courseId")
);

-- CreateTable
CREATE TABLE "InvoiceStudent" (
    "id" UUID NOT NULL,
    "amount" MONEY NOT NULL,
    "hasStudentPaid" BOOLEAN NOT NULL DEFAULT false,
    "pdfUrl" VARCHAR(2000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "InvoiceStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceInstructor" (
    "id" UUID NOT NULL,
    "amount" MONEY NOT NULL,
    "hasInstructorGotPaid" BOOLEAN NOT NULL DEFAULT false,
    "pdfUrl" VARCHAR(2000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "InvoiceInstructor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userName_key" ON "UserProfile"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserHashedPassword_email_key" ON "UserHashedPassword"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserHashedPassword_userId_key" ON "UserHashedPassword"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserHashedRefreshJWT_email_key" ON "UserHashedRefreshJWT"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserHashedRefreshJWT_userId_key" ON "UserHashedRefreshJWT"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_userId_key" ON "Manager"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_userId_key" ON "Instructor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OnlineStudent_studentId_key" ON "OnlineStudent"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "InpersonStudent_studentId_key" ON "InpersonStudent"("studentId");

-- AddForeignKey
ALTER TABLE "UserHashedPassword" ADD CONSTRAINT "UserHashedPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHashedRefreshJWT" ADD CONSTRAINT "UserHashedRefreshJWT_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlineStudent" ADD CONSTRAINT "OnlineStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonStudent" ADD CONSTRAINT "InpersonStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProject" ADD CONSTRAINT "StudentProject_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProject" ADD CONSTRAINT "StudentProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentQuiz" ADD CONSTRAINT "StudentQuiz_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentQuiz" ADD CONSTRAINT "StudentQuiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAssignment" ADD CONSTRAINT "StudentAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAssignment" ADD CONSTRAINT "StudentAssignment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonSchedule" ADD CONSTRAINT "InpersonSchedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonSchedule" ADD CONSTRAINT "InpersonSchedule_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonSchedule" ADD CONSTRAINT "InpersonSchedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlineSchedule" ADD CONSTRAINT "OnlineSchedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlineSchedule" ADD CONSTRAINT "OnlineSchedule_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlineSchedule" ADD CONSTRAINT "OnlineSchedule_onlineStudentId_fkey" FOREIGN KEY ("onlineStudentId") REFERENCES "OnlineStudent"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonStudentSchedule" ADD CONSTRAINT "InpersonStudentSchedule_inpersonStudentId_fkey" FOREIGN KEY ("inpersonStudentId") REFERENCES "InpersonStudent"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonStudentSchedule" ADD CONSTRAINT "InpersonStudentSchedule_inpersonScheduleId_fkey" FOREIGN KEY ("inpersonScheduleId") REFERENCES "InpersonSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonLecture" ADD CONSTRAINT "InpersonLecture_inpersonScheduleId_fkey" FOREIGN KEY ("inpersonScheduleId") REFERENCES "InpersonSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlineLecture" ADD CONSTRAINT "OnlineLecture_onlineScheduleId_fkey" FOREIGN KEY ("onlineScheduleId") REFERENCES "OnlineSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonAttendence" ADD CONSTRAINT "InpersonAttendence_inpersonStudentId_fkey" FOREIGN KEY ("inpersonStudentId") REFERENCES "InpersonStudent"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InpersonAttendence" ADD CONSTRAINT "InpersonAttendence_inpersonLectureId_fkey" FOREIGN KEY ("inpersonLectureId") REFERENCES "InpersonLecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceStudent" ADD CONSTRAINT "InvoiceStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceInstructor" ADD CONSTRAINT "InvoiceInstructor_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
