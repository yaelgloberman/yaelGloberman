import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Class extends Model<Class> {
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  remainingPlaces: number;
}
