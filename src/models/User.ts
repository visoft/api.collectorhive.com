import bcrypt from 'bcrypt';
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
  BeforeCreate,
  BeforeUpdate,
  TableOptions,
  IsEmail,
  Unique,
} from 'sequelize-typescript';

import tokenUtil from '../utils/token';

@Table({
  modelName: 'User',
  tableName: 'Users',
} as TableOptions)
class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @Unique
  @IsEmail
  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @AllowNull(false)
  @Column
  provider!: string;

  @Column
  providerId!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BeforeCreate
  static setProviderId(instance: User): User {
    if (instance.provider === 'local') {
      const token = tokenUtil(instance.email);
      instance.providerId = token; // eslint-disable-line no-param-reassign
    }
    return instance;
  }

  @BeforeCreate
  @BeforeUpdate
  static async updatePassword(instance: User): Promise<User> {
    if (instance.changed('password')) {
      const hashedPassword = await bcrypt.hash(instance.password, 12);
      instance.password = hashedPassword; // eslint-disable-line no-param-reassign
    }

    return instance;
  }
}

export default User;
