import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { Book } from './entities/book.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async getAllBooks() {
    return this.bookModel.findAll();
  }

  async getBookById(bookId: string) {
    const book = await this.bookModel.findByPk(bookId);

    return book;
  }

  async addBook(createBookDto: CreateBookInput) {
    return this.bookModel.create({ ...createBookDto });
  }

  async update(bookId: string, updateBookDto: UpdateBookInput) {
    return this.bookModel.update(
      { ...updateBookDto },
      { where: { id: bookId } },
    );
  }

  async remove(bookId: string) {
    const book = await this.bookModel.findByPk(bookId);
    return book.destroy();
  }
}
