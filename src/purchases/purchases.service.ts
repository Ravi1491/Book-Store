import { Injectable } from '@nestjs/common';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UpdatePurchaseInput } from './dto/update-purchase.input';
import { PurchaseHistories } from './entities/purchase.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(PurchaseHistories)
    private purchaseModel: typeof PurchaseHistories,
  ) {}

  create(createPurchaseInput: CreatePurchaseInput) {
    return this.purchaseModel.create({ ...createPurchaseInput });
  }

  findOne(payload = {}, options = {}) {
    return this.purchaseModel.findOne({
      where: payload,
      ...options,
    });
  }

  async findAll(payload = {}, options = {}): Promise<PurchaseHistories[]> {
    return this.purchaseModel.findAll({
      where: payload,
      ...options,
    });
  }

  update(id: string, updatePurchaseInput: UpdatePurchaseInput) {
    return this.purchaseModel.update(
      {
        ...updatePurchaseInput,
      },
      { where: { id } },
    );
  }

  remove(id: string) {
    return this.purchaseModel.destroy({ where: { id } });
  }
}
