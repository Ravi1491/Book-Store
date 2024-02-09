import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';
import { UserModule } from 'src/user/user.module';
import { BookAuthors } from './entities/book-author.entity';
import { BookAuthorService } from './book-author.service';

@Module({
  imports: [SequelizeModule.forFeature([Book, BookAuthors]), UserModule],
  providers: [BooksResolver, BooksService, BookAuthorService],
  exports: [BooksService, BookAuthorService],
})
export class BooksModule {}
