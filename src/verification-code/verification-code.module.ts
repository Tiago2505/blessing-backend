import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCodeService } from './verification-code.service';
import { VerificationCode } from './entities';
import { UsersModule } from '../users/users.module';
import { SendEmailModule } from '../send-email/send-email.module';

@Module({
  controllers: [],
  providers: [VerificationCodeService],
  imports: [TypeOrmModule.forFeature([VerificationCode]), UsersModule, SendEmailModule],
  exports: [VerificationCodeService]
})
export class VerificationCodeModule {

}
