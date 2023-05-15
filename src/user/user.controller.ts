import {
  Body,
  Controller,
  Request,
  UseGuards,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { UserProfile } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../Decorators/publicEndpoint.decorator';
import {
  CreateUserBodyDto,
  ICurrentUser,
  IUser,
  UpdateUserPayloadDto,
} from '../Models/user.model';
import { UserService } from './user.service';
import { CurrentUser } from '../Decorators/CurrentUser.decorator';
import { Roles } from '../../src/Decorators/roles.decorator';
import { RolesGuard } from '../../src/auth/guards/roles.guard';
import { AccessControlService } from 'src/auth/accessControl.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // protected route by jwt
  // return user data from jwt(access_token)
  // @UseGuards(JwtAuthGuard)
  @Get('profile/:targetUserId')
  async getUser(
    @CurrentUser() currentUser: ICurrentUser,
    @Param('targetUserId') targetUserId,
  ) {
    const targtUserProfile = await this.userService.getUserProfileById(
      targetUserId,
    );
    await AccessControlService.checkAccessOrThrow(
      currentUser.userId,
      targetUserId,
      currentUser.role,
      targtUserProfile.role,
    );
    return this.userService.getUserById(
      targtUserProfile.userId,
      targtUserProfile.role,
    );
  }

  // @Roles(Role)
  // @UseGuards(JwtAuthGuard, RolesGuard)

  @UseGuards(JwtAuthGuard)
  @Put('/:targetUserId')
  async updateUser(
    @CurrentUser() currentUser: ICurrentUser,
    @Param('targetUserId') targetUserId,
    @Body()
    { name, DOB }: UpdateUserPayloadDto,
  ): Promise<UserProfile> {
    // ): Promise<IUser<typeof currentUser.role>> {
    //include other tables depending on user type
    const targtUserProfile = await this.userService.getUserProfileById(
      targetUserId,
    );
    await AccessControlService.checkAccessOrThrow(
      currentUser.userId,
      targetUserId,
      currentUser.role,
      targtUserProfile.role,
    );
    return this.userService.updateUser(targetUserId, name, DOB);
  }
}
