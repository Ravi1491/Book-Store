import { Module } from '@nestjs/common';
import { BookRatingService } from './book-rating.service';
import { BookRatingResolver } from './book-rating.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookReview } from './entities/book-rating.entity';
import { UserModule } from 'src/user/user.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [SequelizeModule.forFeature([BookReview]), UserModule, BooksModule],
  providers: [BookRatingResolver, BookRatingService],
  exports: [BookRatingService],
})
export class BookRatingModule {}
