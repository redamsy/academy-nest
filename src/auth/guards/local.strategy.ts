// https://docs.nestjs.com/security/authentication#implementing-passport-jwt
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ICurrentUser } from 'src/Models/user.model';

// local means email/pass auth
// Our Passport local strategy has a default name of 'local'
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    // We can pass an options object in the call to super() to customize the behavior of the passport strategy.
    // In this example, the passport-local strategy by default expects properties called username and password in the request body.
    // Pass an options object to specify different property names, for example: super({ usernameField: 'email' })
    // check http://www.passportjs.org/docs/configure/
    super({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // validate email/pass and attach user to request
  async validate(
    request: Request,
    email: string,
    password: string,
  ): Promise<ICurrentUser> {
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('LocalStrategy: !user');
    }
    return {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };
  }
}
