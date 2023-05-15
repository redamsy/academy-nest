import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserClient } from './user.client';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService, UserClient],
  exports: [UserService],
})
export class UserModule {}
