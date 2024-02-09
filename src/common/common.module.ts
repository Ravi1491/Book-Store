import { Global, Module } from '@nestjs/common';
import { DateScalar } from './date-scaler.service';
import { EmailService } from './email.service';
import { TasksService } from './task-service';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [UserModule],
  providers: [DateScalar, EmailService, TasksService],
  exports: [EmailService],
})
export class CommonModule {}
