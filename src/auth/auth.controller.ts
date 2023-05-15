import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UserProfile } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../Decorators/publicEndpoint.decorator';
import {
  CreateUserBodyDto,
  ICurrentUser,
  IUser,
  UpdateUserPayloadDto,
} from '../Models/user.model';
import { UserService } from '../user/user.service';
import { CurrentUser } from '../Decorators/CurrentUser.decorator';
import { Roles } from '../../src/Decorators/roles.decorator';
import { RolesGuard } from '../../src/auth/guards/roles.guard';
import { AccessControlService } from 'src/auth/accessControl.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ICurrentUserWithRt, SiginBodyDto } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // public route
  @Public()
  @Post('signup')
  public async signup(
    @Body()
    { userName, email, name, password, DOB }: CreateUserBodyDto,
  ): Promise<UserProfile> {
    return this.userService.createUser(userName, email, name, password, DOB);
  }

  // protected route by email/password combination
  // generate and get access and refresh tokens with profile
  // we flag this rout as public, since JwtAuthGuard is globally set in app.Module aand we don't want JwtAuthGuard here
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @Body() { email, password }: SiginBodyDto, // no need for this because we are using guard and strategy to sigin
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.authService.getTokensWithUserProfile(currentUser.userId);
  }

  @Post('logout')
  logout(@CurrentUser() { userId }: ICurrentUser): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refreshTokens(
    @CurrentUser() { userId, email, refreshToken }: ICurrentUserWithRt,
  ) {
    return this.authService.refreshTokens(userId, email, refreshToken);
  }
}
