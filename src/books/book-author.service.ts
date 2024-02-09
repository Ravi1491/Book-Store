import { Injectable } from '@nestjs/common';
import { CreateBookAuthorInput } from './dto/create-book.input';
import { InjectModel } from '@nestjs/sequelize';
import { BookAuthors } from './entities/book-author.entity';

@Injectable()
export class BookAuthorService {
  constructor(
    @InjectModel(BookAuthors)
    private bookAuthorModel: typeof BookAuthors,
  ) {}

  async addBookAuthor(createBookAuthorInput: CreateBookAuthorInput) {
    console.log(createBookAuthorInput);
    return this.bookAuthorModel.create({ ...createBookAuthorInput });
  }

  async findAll(payload = {}) {
    return this.bookAuthorModel.findAll({ where: payload });
  }
}
