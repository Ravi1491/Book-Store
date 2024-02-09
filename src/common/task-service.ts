import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from './email.service';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Cron('60 * * * * *')
  async handleCron() {
    try {
      this.logger.debug('Called when the current second is 10');
      const authors = await this.userService.find({ role: UserRole.AUTHOR });

      await Promise.all(
        authors.map(async (author) => {
          await this.emailService.sendMail(
            author.email,
            'Reminder',
            '<h1>You have a book to write!</h1>',
          );
        }),
      );

      this.logger.debug('Called when the current second is 45');
    } catch (error) {
      this.logger.error(`Failed to send email: ${error}`);
    }
  }
}
