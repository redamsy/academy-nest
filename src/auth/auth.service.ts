import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from './hash.service';
import { UserProfile } from '@prisma/client';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserProfile> {
    const userHashedPassword =
      await this.userService.getUserHashedPasswordByEmail(email);
    const userProfile = await this.userService.getUserProfileByEmail(email);
    const isPassword = await this.hashService.compareHash(
      pass,
      userHashedPassword.hashedPassword,
    );
    if (!userHashedPassword) {
      throw new UnauthorizedException(
        'authService: Cannot find userHashedPassword',
      );
    }
    if (!isPassword) {
      throw new UnauthorizedException('authService: Wrong Password');
    }
    if (!userProfile) {
      throw new UnauthorizedException(
        'authService: No userProfile with this email',
      );
    }
    return userProfile;
  }

  // get access and refresh tokens
  async getTokensWithUserProfile(userId: string): Promise<{
    userProfile: UserProfile;
    tokens: Tokens;
  }> {
    const userProfile = await this.userService.getUserProfileById(userId);
    const tokens = await this.generateTokens(userProfile);
    await this.updateOrCreateUserHashedRefreshJWT(
      userProfile.userId,
      userProfile.email,
      tokens.refresh_token,
    );
    return {
      userProfile,
      tokens,
    };
  }

  async logout(userId: string): Promise<boolean> {
    const userHashedRefreshJWT =
      await this.userService.getUserHashedRefreshJWTByUserId(userId);
    if (userHashedRefreshJWT)
      await this.userService.removeUserHashedRefreshJWT(userId);
    return true;
  }

  async refreshTokens(
    userId: string,
    email: string,
    refreshToken: string,
  ): Promise<{
    userProfile: UserProfile;
    tokens: Tokens;
  }> {
    const userProfile = await this.userService.getUserProfileById(userId);
    if (!userProfile)
      throw new ForbiddenException('Access Denied, userProfile not found');
    const userHashedRefreshJWT =
      await this.userService.getUserHashedRefreshJWTByUserId(userId);
    if (!userHashedRefreshJWT)
      throw new ForbiddenException(
        'Access Denied, userHashedRefreshJWT not found',
      );

    const rtMatches = await this.hashService.compareHash(
      refreshToken,
      userHashedRefreshJWT.hashedRefreshJWT,
    );
    if (!rtMatches)
      throw new ForbiddenException(
        'Access Denied, userHashedRefreshJWT did not match',
      );

    const tokens = await this.generateTokens(userProfile);
    await this.updateOrCreateUserHashedRefreshJWT(
      userId,
      email,
      tokens.refresh_token,
    );

    return {
      userProfile,
      tokens,
    };
  }

  async updateOrCreateUserHashedRefreshJWT(
    userId: string,
    email: string,
    rt: string,
  ): Promise<void> {
    const hashedRt = await this.hashService.generateHash(rt);
    const userHashedRefreshJWT =
      await this.userService.getUserHashedRefreshJWTByUserId(userId);
    if (userHashedRefreshJWT)
      await this.userService.updateUserHashedRefreshJWT(userId, hashedRt);
    else
      await this.userService.createUserHashedRefreshJWT(
        userId,
        email,
        hashedRt,
      );
  }

  async generateTokens(userProfile: UserProfile): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userProfile.userId,
      userName: userProfile.userName,
      email: userProfile.email,
      role: userProfile.role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.sign(jwtPayload),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
