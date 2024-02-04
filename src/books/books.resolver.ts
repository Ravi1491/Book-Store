import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User, UserRole } from 'src/user/entities/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@Resolver('Book')
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

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

      const newBook = await this.booksService.addBook(createBookInput);
      return newBook;
    } catch (error) {
      throw new Error('Failed to create a new book.');
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

      const updatedBook = await this.booksService.update(
        updateBookInput.id,
        updateBookInput,
      );
      if (!updatedBook) {
        throw new NotFoundException('Book not found');
      }
      return updatedBook;
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

      const removedBook = await this.booksService.remove(id);

      return removedBook;
    } catch (error) {
      throw new Error('Failed to remove the book.');
    }
  }
}
