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
  name!: string;

  @Column
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

  // @BeforeCreate
  // static async setProvider(instance: User) {
  //   if (instance.provider === 'local') {
  //     const token = jwt.sign({ id: instance.email }, jwtSecret.secret);
  //     instance.providerId = token; // eslint-disable-line no-param-reassign
  //   }
  // }

  // @BeforeCreate
  // @BeforeUpdate
  // static async updatePassword(instance: User) {
  //   const hashedPassword = await bcrypt.hash(instance.password, 12);
  //   instance.password = hashedPassword; // eslint-disable-line no-param-reassign
  // }
}

export default User;
