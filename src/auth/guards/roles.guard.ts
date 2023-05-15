import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../src/Decorators/roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (user.role === Role.SYSTEM_ADMIN) {
      return true;
    }
    if (
      user.role === Role.MANAGER &&
      requiredRoles.includes(
        Role.MANAGER ||
          Role.INSTRUCTOR ||
          Role.INPERSON_STUDENT ||
          Role.ONLINE_STUDENT,
      )
    ) {
      return true;
    }
    return requiredRoles.some((role) => user.role === role);
  }
}
