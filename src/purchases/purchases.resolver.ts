import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User, UserRole } from 'src/user/entities/user.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BooksService } from 'src/books/books.service';

@Resolver('Purchase')
export class PurchasesResolver {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly booksService: BooksService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createPurchase')
  async create(
    @CurrentUser() user: User,
    @Args('createPurchaseInput') createPurchaseInput: CreatePurchaseInput,
  ) {
    try {
      const bookExist = await this.booksService.getBookById(
        createPurchaseInput.bookId,
      );

      if (!bookExist) {
        throw new NotFoundException('Book not found');
      }

      const userExist = await this.userService.findOne({
        id: createPurchaseInput.userId,
      });

      if (!userExist) {
        throw new NotFoundException('User not found');
      }

      if (createPurchaseInput.purchaseDate < bookExist.createdAt) {
        throw new Error(
          'Purchase date cannot be earlier than book published date',
        );
      }

      if (createPurchaseInput.purchaseDate > new Date()) {
        throw new Error('Purchase date cannot be in the future');
      }

      createPurchaseInput['bookPrice'] = bookExist.price;
      createPurchaseInput['totalPrice'] =
        createPurchaseInput.quantity * bookExist.price;

      return this.purchasesService.create(createPurchaseInput);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @Query('getAllPurchases')
  async getAllPurchases(@CurrentUser() user: User) {
    try {
      const purchases = await this.purchasesService.findAll();
      return purchases;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query('getPurchaseById')
  async getPurchaseById(@CurrentUser() user: User, @Args('id') id: string) {
    try {
      const purchase = await this.purchasesService.findOne({ id });

      if (!purchase) {
        console.log(purchase);
        throw new NotFoundException('purchase not found');
      }
      return purchase;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query('getUserPurchases')
  async getUserPurchases(
    @CurrentUser() user: User,
    @Args('userId') userId: string,
  ) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException(
          'You are not authorized to retrieve the purchase history.',
        );
      }

      const purchases = await this.purchasesService.findAll({
        userId,
      });

      if (!purchases) {
        throw new NotFoundException('No purchase history found.');
      }

      return purchases;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @Query('getBookPurchases')
  async getBookPurchases(
    @CurrentUser() user: User,
    @Args('bookId') bookId: string,
  ) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException(
          'You are not authorized to retrieve the purchase history.',
        );
      }

      const purchases = await this.purchasesService.findAll({
        bookId,
      });

      if (!purchases) {
        throw new NotFoundException('No purchase history found.');
      }

      return purchases;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @Mutation('updatePurchase')
  async update(
    @CurrentUser() user: User,
    @Args('updatePurchaseInput') updatePurchaseInput: UpdatePurchaseInput,
  ) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException(
          'You are not authorized to update Purchase.',
        );
      }

      const purchase = await this.purchasesService.findOne({
        id: updatePurchaseInput.id,
      });

      const book = await this.booksService.getBookById(purchase.bookId);

      if (updatePurchaseInput.quantity) {
        updatePurchaseInput['totalPrice'] =
          updatePurchaseInput.quantity * purchase.bookPrice;
      }

      if (updatePurchaseInput.purchaseDate < book.createdAt) {
        throw new Error(
          'Purchase date cannot be earlier than book published date',
        );
      }

      if (updatePurchaseInput.purchaseDate > new Date()) {
        throw new Error('Purchase date cannot be in the future');
      }

      await this.purchasesService.update(
        updatePurchaseInput.id,
        updatePurchaseInput,
      );

      return 'Purchase updated successfully';
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @Mutation('removePurchase')
  async remove(@CurrentUser() user: User, @Args('id') id: string) {
    try {
      if (user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException(
          'You are not authorized to remove Purchase.',
        );
      }

      await this.purchasesService.remove(id);

      return 'Purchase removed successfully';
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
