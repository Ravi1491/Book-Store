import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User, UserRole } from 'src/user/entities/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Book } from './entities/book.entity';
import { BookAuthorService } from './book-author.service';

@Resolver('Book')
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly bookAuthorService: BookAuthorService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createBook')
  async create(
    @CurrentUser() user: User,
    @Args('createBookInput') createBookInput: CreateBookInput,
  ) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException('You are not authorized to add books.');
      }

      if (createBookInput.price < 100 || createBookInput.price > 1000) {
        throw new Error('Price must be between 100 and 1000.');
      }

      createBookInput.authors.map(async (author) => {
        const authorExist = await this.userService.findOne({
          name: author.name,
          username: author.username,
        });

        if (!authorExist) {
          throw new NotFoundException('Author not found');
        }
      });

      const payload: CreateBookInput = {
        ...createBookInput,
        sellCount: 0,
      };

      const newBook = await this.booksService.addBook(payload);
      return newBook;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @Query('getAllBooks')
  async getAllBooks(@CurrentUser() user: User) {
    try {
      const books = await this.booksService.getAllBooks();
      return books;
    } catch (error) {
      throw new Error('Failed to retrieve books.');
    }
  }

  @Query('getBookById')
  async getBookById(@CurrentUser() user: User, @Args('id') id: string) {
    try {
      const book = await this.booksService.getBookById(id);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      throw new Error('Failed to retrieve the book.');
    }
  }

  @Mutation('updateBook')
  async update(
    @CurrentUser() user: User,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException(
          'You are not authorized to update books.',
        );
      }

      if (updateBookInput.price < 100 || updateBookInput.price > 1000) {
        throw new Error('Price must be between 100 and 1000.');
      }

      if (updateBookInput.title) {
        const book = await this.booksService.getBookById(updateBookInput.id);
        if (!book) {
          throw new NotFoundException('Book not found');
        }
      }

      const updatedBook = await this.booksService.update(
        updateBookInput.id,
        updateBookInput,
      );

      if (!updatedBook) {
        throw new NotFoundException('Book not found');
      }

      return 'Book updated successfully.';
    } catch (error) {
      throw new Error('Failed to update the book.');
    }
  }

  @Mutation('removeBook')
  async remove(@CurrentUser() user: User, @Args('id') id: string) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException(
          'You are not authorized to remove books.',
        );
      }

      await this.booksService.remove(id);

      return 'Book removed successfully.';
    } catch (error) {
      throw new Error('Failed to remove the book.');
    }
  }

  @ResolveField()
  async authors(@Parent() book: Book) {
    try {
      const authors = await this.bookAuthorService.findAll({
        bookId: book.id,
      });

      const authorData = await Promise.all(
        authors.map(async (author) => {
          const authorData = await this.userService.findOne({
            id: author.authorId,
          });

          return authorData;
        }),
      );
      return authorData;
    } catch (error) {
      throw new Error('Failed to retrieve authors.');
    }
  }
}
