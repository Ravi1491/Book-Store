import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesResolver } from './purchases.resolver';

@Module({
  providers: [PurchasesResolver, PurchasesService],
})
export class PurchasesModule {}
