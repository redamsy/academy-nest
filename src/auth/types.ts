import { IsNotEmpty, IsString } from 'class-validator';
import { ICurrentUser } from 'src/Models/user.model';

export class SiginBodyDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export type JwtPayload = Omit<ICurrentUser, 'userId'> & {
  sub: string;
};
export type ICurrentUserWithRt = ICurrentUser & { refreshToken: string };
export type Tokens = {
  access_token: string;
  refresh_token: string;
};
