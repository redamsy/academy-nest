import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class AccessControlService {
  public static async checkAccessOrThrow(
    currentUserID: string,
    targetUserID: string,
    currentUserRole: Role,
    targetUserRole: Role,
  ): Promise<void> {
    const isValid = await AccessControlService.checkAccess(
      currentUserID,
      targetUserID,
      currentUserRole,
      targetUserRole,
    );
    if (!isValid)
      throw new UnauthorizedException(
        'AccessControl: Unauthorized due to insufficient privilege',
      );
  }

  public static checkAccess(
    currentUserID: string,
    targetUserID: string,
    currentUserRole: Role,
    targetUserRole: Role,
  ): boolean {
    if (currentUserID === targetUserID) {
      // User can always update themselves
      return true;
    }

    switch (currentUserRole) {
      case Role.SYSTEM_ADMIN:
        // System admin can update everyone
        return true;
      case Role.MANAGER:
        if (targetUserRole !== Role.SYSTEM_ADMIN) {
          // Manager can update everyone except System admin
          return true;
        }
        return false;
      default:
        return false;
    }
  }
}
