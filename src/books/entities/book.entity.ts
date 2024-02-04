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
export class Book extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false, unique: true })
  title: string;

  @Column({ allowNull: false, type: DataType.JSONB })
  author: object;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  sellCount: number;

  @Min(100)
  @Max(1000)
  @Column({ allowNull: false })
  price: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
