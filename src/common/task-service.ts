import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from './email.service';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/entities/user.entity';
import { BooksService } from 'src/books/books.service';
import { BookAuthorService } from 'src/books/book-author.service';
import { PurchasesService } from 'src/purchases/purchases.service';
import { Op } from 'sequelize';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly bookService: BooksService,
    private readonly bookAuthorService: BookAuthorService,
    private readonly purchaseService: PurchasesService,
  ) {}

  @Cron('5 * * * * *')
  async handleCron() {
    try {
      this.logger.debug('Called when the current second is 10');
      const authors = await this.userService.find({ role: UserRole.AUTHOR });

      let today = new Date();
      let firstDayOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      );
      let firstDayOfPreviousMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      );
      let lastDayOfPreviousMonth = new Date(firstDayOfThisMonth);
      lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() - 1);

      let purchaseData;
      await Promise.all(
        authors.map(async (author) => {
          const bookAuthors = await this.bookAuthorService.findAll({
            authorId: author.id,
          });

          await Promise.all(
            bookAuthors.map(async (bookAuthor) => {
              purchaseData = await this.purchaseService.findAll({
                bookId: bookAuthor.bookId,
                purchaseDate: {
                  [Op.between]: [
                    firstDayOfPreviousMonth,
                    lastDayOfPreviousMonth,
                  ],
                },
              });
            }),
          );

          purchaseData.map(async (purchase) => {
            console.log(purchase.bookId);
            const book = await this.bookService.findOne({
              id: purchase.bookId,
            });
            const date = new Date(purchase.purchaseDate);

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            const formattedDate = `${day}-${month}-${year}`;

            await this.emailService.sendMail(
              author.email,
              'Reminder',
              `
              <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Book Purchase History</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Book Purchase History in Last 1 Month</h2>
          <table style="width: 100%; border-collapse: collapse;">
              <thead>
                  <tr style="background-color: #f2f2f2;">
                      <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Purchase Date</th>
                      <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Book Title</th>
                      <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Book Price</th>
                      <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Quantity</th>
                      <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Total Price</th>
                  </tr>
              </thead>
              <tbody>
                  <!-- Replace the sample data with actual data from your system -->
                  <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${formattedDate}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${book.title}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${purchase.bookPrice}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${purchase.quantity}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${purchase.totalPrice}</td>
                  </tr>
                  <!-- Add more rows if there are additional purchases -->
              </tbody>
          </table>
      </div>
    </body>
    </html>
    
              `,
            );
          });
        }),
      );

      this.logger.debug('Called when the current second is 45');
    } catch (error) {
      this.logger.error(`Failed to send email: ${error}`);
    }
  }
}
