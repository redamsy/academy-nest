import { v4 as uuidV4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  UserProfile,
  UserHashedPassword,
  UserHashedRefreshJWT,
  Role,
} from '@prisma/client';
import { IUser } from 'src/Models/user.model';

@Injectable()
export class UserClient {
  constructor(private prisma: PrismaService) {}

  // userHashedPassword table
  public async getUserHashedPasswordByEmail(
    email: string,
  ): Promise<UserHashedPassword | undefined> {
    const userHashedPassword = await this.prisma.userHashedPassword.findUnique({
      where: { email },
    });
    if (!userHashedPassword) {
      throw new NotFoundException(
        'UserClient: No userHashedPassword with this email',
      );
    }
    return userHashedPassword;
  }

  public async createUserHashedPassword(
    userId: string,
    email: string,
    hashedPassword: string,
  ): Promise<void> {
    await this.prisma.userHashedPassword.create({
      data: {
        userId,
        email,
        hashedPassword,
      },
    });
  }

  // userRefreshJWT table
  public async getUserHashedRefreshJWTByUserId(
    userId: string,
  ): Promise<UserHashedRefreshJWT | undefined> {
    return this.prisma.userHashedRefreshJWT.findUnique({
      where: { userId },
    });
  }

  public async createUserHashedRefreshJWT(
    userId: string,
    email: string,
    hashedRefreshJWT: string,
  ): Promise<void> {
    await this.prisma.userHashedRefreshJWT.create({
      data: {
        userId,
        email,
        hashedRefreshJWT,
      },
    });
  }

  public async updateUserHashedRefreshJWT(
    userId: string,
    hashedRefreshJWT: string,
  ): Promise<UserHashedRefreshJWT> {
    return this.prisma.userHashedRefreshJWT.update({
      data: {
        hashedRefreshJWT,
      },
      where: { userId },
    });
  }

  public async removeUserHashedRefreshJWT(userId: string) {
    return this.prisma.userHashedRefreshJWT.delete({
      where: { userId },
    });
  }

  public async getUserProfileByEmail(
    email: string,
  ): Promise<UserProfile | undefined> {
    return this.prisma.userProfile.findUnique({
      where: { email },
    });
  }

  public async getUserProfileByUserName(
    userName: string,
  ): Promise<UserProfile | undefined> {
    return this.prisma.userProfile.findUnique({
      where: { userName },
    });
  }

  public async getUserProfileById(userId: string): Promise<UserProfile | null> {
    const userProfile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });
    if (!userProfile) {
      throw new NotFoundException('UserClient: No userProfile with this id');
    }
    return userProfile;
  }

  public async getUserById(
    userId: string,
    role: Role,
  ): Promise<IUser<typeof role>> {
    const user = await this.prisma.userProfile.findUnique({
      where: { userId },
      include: {
        ...(role === Role.SYSTEM_ADMIN && {
          admin: true,
        }),
        ...(role === Role.MANAGER && {
          manager: true,
        }),
        ...(role === Role.INSTRUCTOR && {
          instructor: true,
        }),
        ...(role === Role.INPERSON_STUDENT && {
          student: {
            include: {
              ...(role === Role.INPERSON_STUDENT && {
                inpersonStudent: true,
              }),
            },
          },
        }),
        ...(role === Role.ONLINE_STUDENT && {
          student: {
            include: {
              ...(role === Role.ONLINE_STUDENT && {
                onlineStudent: true,
              }),
            },
          },
        }),
      },
    });
    if (!user) {
      throw new NotFoundException('UserClient: No userProfile with this id');
    }
    return user;
  }

  public async createUserProfile(
    userName: string,
    email: string,
    name: string,
    DOB: Date,
  ): Promise<UserProfile> {
    const id = uuidV4();

    return this.prisma.userProfile.create({
      data: {
        userId: id,
        userName,
        email,
        name,
        DOB,
      },
    });
  }

  public async updateUser(
    userId: string,
    name: string,
    DOB: Date,
  ): Promise<UserProfile> {
    return this.prisma.userProfile.update({
      data: {
        name,
        DOB,
      },
      where: { userId },
    });
  }
}
