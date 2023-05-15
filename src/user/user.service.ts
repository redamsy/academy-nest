import {
  Injectable,
  InternalServerErrorException,
  forwardRef,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import {
  UserHashedPassword,
  UserProfile,
  UserHashedRefreshJWT,
  Role,
} from '@prisma/client';
import { either } from 'fp-ts';
import { HashService } from '../auth/hash.service';
import { UserClient } from './user.client';
import { IUser } from 'src/Models/user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly userClient: UserClient,
    @Inject(forwardRef(() => HashService))
    private hashService: HashService,
  ) {}

  async getUserHashedPasswordByEmail(
    email: string,
  ): Promise<UserHashedPassword | undefined> {
    return this.userClient.getUserHashedPasswordByEmail(email);
  }

  async getUserHashedRefreshJWTByUserId(
    userId: string,
  ): Promise<UserHashedRefreshJWT | undefined> {
    return this.userClient.getUserHashedRefreshJWTByUserId(userId);
  }

  public async createUserHashedRefreshJWT(
    userId: string,
    email: string,
    hashedRefreshJWT: string,
  ): Promise<void> {
    return this.userClient.createUserHashedRefreshJWT(
      userId,
      email,
      hashedRefreshJWT,
    );
  }

  public async updateUserHashedRefreshJWT(
    userId: string,
    hashedRefreshJWT: string,
  ): Promise<UserHashedRefreshJWT> {
    try {
      const result = await this.userClient.updateUserHashedRefreshJWT(
        userId,
        hashedRefreshJWT,
      );
      if (!result) {
        throw new NotFoundException(
          'UserService: Failed to update HashedRefreshJWT',
        );
      }
      return result;
    } catch (e) {
      throw new NotFoundException(
        `UserService: Failed to update HashedRefreshJWT with error code ${e.code}`,
      );
    }
  }

  public async removeUserHashedRefreshJWT(userId: string): Promise<any> {
    try {
      const result = await this.userClient.removeUserHashedRefreshJWT(userId);
      if (!result) {
        throw new NotFoundException(
          'UserService: UserHashedRefreshJWT doesnot exist for this userId',
        );
      }
      return result;
    } catch (e) {
      throw new NotFoundException(
        `UserService: Failed to delete UserHashedRefreshJWT with error code ${e.code}`,
      );
    }
  }

  async getUserById(
    userId: string,
    role: Role,
  ): Promise<IUser<typeof role> | undefined> {
    return this.userClient.getUserById(userId, role);
  }

  async getUserProfileById(userId: string): Promise<UserProfile | undefined> {
    return this.userClient.getUserProfileById(userId);
  }

  async getUserProfileByEmail(email: string): Promise<UserProfile> {
    const userProfile = await this.userClient.getUserProfileByEmail(email);
    if (!userProfile) {
      throw new NotFoundException(
        'UserService: No userProfile with this email',
      );
    }
    return userProfile;
  }

  public async createUser(
    userName: string,
    email: string,
    name: string,
    password: string,
    DOB: Date,
  ): Promise<UserProfile> {
    try {
      const existingEmail = await this.userClient.getUserProfileByEmail(email);
      if (existingEmail) {
        return Promise.reject(
          new InternalServerErrorException(
            `UserService: Error email already used`,
          ),
        );
      }

      const existingUserName = await this.userClient.getUserProfileByUserName(
        userName,
      );
      if (existingUserName) {
        return Promise.reject(
          new InternalServerErrorException(
            `UserService: Error userName already used`,
          ),
        );
      }

      const createdUserProfile = await this.userClient.createUserProfile(
        userName,
        email,
        name,
        DOB,
      );
      if (!createdUserProfile) {
        return Promise.reject(
          new InternalServerErrorException(
            `UserService: Unknown error occurred creating user profile`,
          ),
        );
      }
      const hashedPassword = await this.hashService.generateHash(password);
      await this.userClient.createUserHashedPassword(
        createdUserProfile.userId,
        email,
        hashedPassword,
      );
      return createdUserProfile;
    } catch (e) {
      return Promise.reject(
        new InternalServerErrorException(
          `UserService: Unknown error occurred creating user profile with error code ${e.code}`,
        ),
      );
    }
  }

  public async updateUser(
    userId: string,
    name: string,
    DOB: Date,
  ): Promise<UserProfile> {
    try {
      const result = await this.userClient.updateUser(userId, name, DOB);
      if (!result) {
        throw new NotFoundException('UserService: Failed to update User');
      }
      return result;
    } catch (e) {
      throw new NotFoundException(
        `UserService: Failed to update User with error code ${e.code}`,
      );
    }
  }
}
