import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { Class } from '../classes/class.entity';
import { IStudent } from './stuednt.interface';

@Table({ timestamps: true, paranoid: true })
export class Student extends Model<Student> implements IStudent {
  
  @PrimaryKey
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
