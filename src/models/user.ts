import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AllowNull,
  DataType,
  Default,
} from 'sequelize-typescript';

@Table
class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  email!: string;

  @Column
  name!: string;

  @Column
  provider!: string;

  @Column
  providerId!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updateAt!: Date;
}

export default User;
