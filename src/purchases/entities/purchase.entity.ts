import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Min,
  Max,
} from 'sequelize-typescript';

@Table({
  underscored: true,
})
export class PurchaseHistories extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  bookId: string;

  @Column({
    allowNull: false,
  })
  userId: string;

  @Column({
    allowNull: false,
  })
  purchaseDate: Date;

  @Column({
    allowNull: false,
  })
  bookPrice: number;

  @Column({
    allowNull: false,
  })
  totalPrice: number;

  @Column({
    allowNull: false,
  })
  quantity: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
