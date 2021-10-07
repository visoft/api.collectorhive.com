import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
  Index,
} from 'sequelize-typescript';

import jwtSecret from '../config/jwt-config';

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

  @Column
  name!: string;

  @Column
  @Index
  email!: string;

  @Column
  password!: string;

  @Column
  provider!: string;

  @Column
  providerId!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BeforeCreate
  static setProvider(instance: User): User {
    if (instance.provider === 'local') {
      const token = jwt.sign({ id: instance.email }, jwtSecret.secret);
      instance.providerId = token; // eslint-disable-line no-param-reassign
    }
    return instance;
  }

  @BeforeCreate
  @BeforeUpdate
  static async updatePassword(instance: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(instance.password, 12);
    instance.password = hashedPassword; // eslint-disable-line no-param-reassign
    return instance;
  }
}

export default User;
