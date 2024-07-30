import { Sequelize } from 'sequelize-typescript';
import { Student } from '../students/student.entity';
import { Class } from 'src/classes/class.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: 'postgres',
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
      });

      sequelize.addModels([Class, Student]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
