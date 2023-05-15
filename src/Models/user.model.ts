import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsEnum,
} from 'class-validator';
// https://docs.nestjs.com/techniques/validation
import { Type } from 'class-transformer';
import {
  Admin,
  InpersonStudent,
  Instructor,
  Manager,
  OnlineStudent,
  Role,
  Student,
  UserProfile,
} from '@prisma/client';

// export enum Role {
//   SYSTEM_ADMIN = 'SYSTEM_ADMIN', //Super
//   MANAGER = 'MANAGER',
//   INSTRUCTOR = 'INSTRUCTOR',
//   ONLINE_STUDENT = 'ONLINE_STUDENT',
//   INPERSON_STUDENT = 'INPERSON_STUDENT',
// }
export type ICurrentUser = Pick<
  UserProfile,
  'userId' | 'userName' | 'email' | 'role'
>;
export type IUser<T extends Role> = UserProfile & {
  admin?: T extends typeof Role.SYSTEM_ADMIN ? Admin : never;
  manager?: T extends typeof Role.MANAGER ? Manager : never;
  instructor?: T extends typeof Role.INSTRUCTOR ? Instructor : never;
  student?: T extends typeof Role.ONLINE_STUDENT | typeof Role.INPERSON_STUDENT
    ? Student & {
        inpersonStudent?: T extends typeof Role.INPERSON_STUDENT
          ? InpersonStudent
          : never;
        onlineStudent?: T extends typeof Role.ONLINE_STUDENT
          ? OnlineStudent
          : never;
      }
    : never;
  //role: T;
};
interface ICreateUserBody {
  userName: string;
  email: string;
  name: string;
  password: string;
}
export class CreateUserBodyDto implements ICreateUserBody {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDefined()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  public DOB: Date;

  constructor(
    userName: string,
    email: string,
    name: string,
    password: string,
    DOB: Date,
  ) {
    this.userName = userName;
    this.email = email;
    this.name = name;
    this.password = password;
    this.DOB = DOB;
  }
}
interface IUpdateUserPayload {
  name: string;
  DOB: Date;
  role: Role;
}
export class UpdateUserPayloadDto implements IUpdateUserPayload {
  @IsDefined()
  @IsEnum(Role)
  @IsNotEmpty()
  public role: Role;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  public DOB: Date;

  constructor(role: Role, name: string, DOB: Date) {
    this.role = role;
    this.name = name;
    this.DOB = DOB;
  }
}
