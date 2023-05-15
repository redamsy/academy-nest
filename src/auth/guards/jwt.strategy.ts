import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ICurrentUser } from 'src/Models/user.model';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<ICurrentUser> {
    console.log('JwtStrategy: payload', payload);

    return {
      userId: payload.sub,
      userName: payload.userName,
      email: payload.email,
      role: payload.role,
    };
  }
}
