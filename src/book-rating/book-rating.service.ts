import { Injectable } from '@nestjs/common';
import { CreateBookRatingInput } from './dto/create-book-rating.input';
import { UpdateBookRatingInput } from './dto/update-book-rating.input';
import { BookReview } from './entities/book-rating.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BookRatingService {
  constructor(
    @InjectModel(BookReview)
    private bookReviewModel: typeof BookReview,
  ) {}

  async create(createBookRatingInput: CreateBookRatingInput) {
    return this.bookReviewModel.create({ ...createBookRatingInput });
  }

  findAll(payload = {}, options = {}) {
    return this.bookReviewModel.findAll({ where: payload, ...options });
  }

  findOne(payload = {}, options = {}) {
    return this.bookReviewModel.findOne({ where: payload, ...options });
  }

  update(id: string, updateBookRatingInput: UpdateBookRatingInput) {
    return this.bookReviewModel.update(updateBookRatingInput, {
      where: { id },
    });
  }

  remove(id: string) {
    return this.bookReviewModel.destroy({ where: { id } });
  }
}
