import { IClass } from './class.interface';
import { Student } from 'src/students/student.entity';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

@Table({ timestamps: true, paranoid: true })
export class Class extends Model<Class> implements IClass {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  className: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  numberOfPlaces: number;

  @HasMany(() => Student)
  students: Student[];
}
