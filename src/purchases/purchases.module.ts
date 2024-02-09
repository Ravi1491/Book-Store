import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesResolver } from './purchases.resolver';
import { BooksModule } from 'src/books/books.module';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchaseHistories } from './entities/purchase.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([PurchaseHistories]),
    BooksModule,
    UserModule,
  ],
  providers: [PurchasesResolver, PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
