import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { Book } from './entities/book.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateBookInput } from './dto/update-book.input';
import { BookAuthorService } from './book-author.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
    private readonly bookAuthorService: BookAuthorService,
    private readonly userService: UserService,
  ) {}

  async getAllBooks() {
    return this.bookModel.findAll();
  }

  async getBookById(bookId: string) {
    const book = await this.bookModel.findByPk(bookId);

    return book;
  }

  async findOne(payload = {}) {
    return this.bookModel.findOne({ where: payload });
  }

  async addBook(createBookDto: CreateBookInput) {
    const book = await this.bookModel.create({ ...createBookDto });

    await Promise.all(
      createBookDto.authors.map(async (author) => {
        const authorData = await this.userService.findOne({
          username: author.username,
        });

        await this.bookAuthorService.addBookAuthor({
          bookId: book.id,
          authorId: authorData.id,
        });
      }),
    );

    return book;
  }

  async update(bookId: string, updateBookDto: UpdateBookInput) {
    return this.bookModel.update(
      { ...updateBookDto },
      { where: { id: bookId } },
    );
  }

  async findAndCountAll(payload = {}, options = {}) {
    return this.bookModel.findAndCountAll({ where: payload, ...options });
  }

  async remove(bookId: string) {
    const book = await this.bookModel.findByPk(bookId);
    return book.destroy();
  }
}
