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
import { Class } from '../classes/class.entity';
import { IStudent } from './stuednt.interface';
import { IsIdentityCard, IsString } from 'class-validator';

@Table
export class Student extends Model<Student> implements IStudent {
  
  @PrimaryKey
  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

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
    allowNull: true,
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
  classId: number;

  @BelongsTo(() => Class)
  class: Class;
}
