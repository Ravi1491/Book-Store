import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  providers: [BooksResolver, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
