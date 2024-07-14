import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Class } from '../classes/class.entity'; // Assuming you have a Class model defined

@Table
export class Student extends Model<Student> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  profession: string;

  @ForeignKey(() => Class)
  @Column({
    type: DataType.INTEGER,
  })
  assignToClass: number;

  @BelongsTo(() => Class)
  class: Class;
}
