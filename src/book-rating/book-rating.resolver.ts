import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookRatingService } from './book-rating.service';
import { CreateBookRatingInput } from './dto/create-book-rating.input';
import { UpdateBookRatingInput } from './dto/update-book-rating.input';
import { BooksService } from 'src/books/books.service';
import { UserService } from 'src/user/user.service';

@Resolver('BookRating')
export class BookRatingResolver {
  constructor(
    private readonly bookRatingService: BookRatingService,
    private readonly bookService: BooksService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createBookRating')
  create(
    @Args('createBookRatingInput') createBookRatingInput: CreateBookRatingInput,
  ) {
    try {
      if (
        createBookRatingInput.rating < 1 ||
        createBookRatingInput.rating > 5
      ) {
        throw new Error('Rating must be between 1 and 5.');
      }

      if (
        createBookRatingInput.review.length < 10 ||
        createBookRatingInput.review.length > 200
      ) {
        throw new Error('Review must be between 10 and 200 characters.');
      }

      const userExist = this.userService.findOne({
        userId: createBookRatingInput.userId,
      });

      if (!userExist) {
        throw new Error('User not found');
      }

      const bookExist = this.bookService.findOne({
        bookId: createBookRatingInput.bookId,
      });

      if (!bookExist) {
        throw new Error('Book not found');
      }

      return this.bookRatingService.create(createBookRatingInput);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query('getAllBookRatings')
  findAll() {
    try {
      return this.bookRatingService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query('getBookRatingById')
  findOne(@Args('id') id: string) {
    try {
      return this.bookRatingService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation('updateBookRating')
  update(
    @Args('updateBookRatingInput') updateBookRatingInput: UpdateBookRatingInput,
  ) {
    try {
      if (
        updateBookRatingInput.rating &&
        (updateBookRatingInput.rating < 1 || updateBookRatingInput.rating > 5)
      ) {
        throw new Error('Rating must be between 1 and 5.');
      }

      if (
        updateBookRatingInput.review &&
        (updateBookRatingInput.review.length < 10 ||
          updateBookRatingInput.review.length > 200)
      ) {
        throw new Error('Review must be between 10 and 200 characters.');
      }

      const userExist = this.userService.findOne({
        userId: updateBookRatingInput.userId,
      });

      if (!userExist) {
        throw new Error('User not found');
      }

      const bookExist = this.bookService.findOne({
        bookId: updateBookRatingInput.bookId,
      });

      if (!bookExist) {
        throw new Error('Book not found');
      }

      return this.bookRatingService.update(
        updateBookRatingInput.id,
        updateBookRatingInput,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation('deleteBookRating')
  remove(@Args('id') id: string) {
    try {
      return this.bookRatingService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
