import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';

@Resolver('Purchase')
export class PurchasesResolver {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Mutation('createPurchase')
  create(@Args('createPurchaseInput') createPurchaseInput: CreatePurchaseInput) {
    return this.purchasesService.create(createPurchaseInput);
  }

  @Query('purchases')
  findAll() {
    return this.purchasesService.findAll();
  }

  @Query('purchase')
  findOne(@Args('id') id: number) {
    return this.purchasesService.findOne(id);
  }

  @Mutation('updatePurchase')
  update(@Args('updatePurchaseInput') updatePurchaseInput: UpdatePurchaseInput) {
    return this.purchasesService.update(updatePurchaseInput.id, updatePurchaseInput);
  }

  @Mutation('removePurchase')
  remove(@Args('id') id: number) {
    return this.purchasesService.remove(id);
  }
}
