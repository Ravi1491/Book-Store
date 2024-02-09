import { Global, Module } from '@nestjs/common';
import { DateScalar } from './date-scaler.service';
import { EmailService } from './email.service';
import { TasksService } from './task-service';
import { UserModule } from 'src/user/user.module';
import { BooksModule } from 'src/books/books.module';
import { PurchasesModule } from 'src/purchases/purchases.module';

@Global()
@Module({
  imports: [UserModule, BooksModule, PurchasesModule],
  providers: [DateScalar, EmailService, TasksService],
  exports: [EmailService],
})
export class CommonModule {}
