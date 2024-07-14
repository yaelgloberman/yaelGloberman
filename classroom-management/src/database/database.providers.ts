// database.providers.ts

import { Sequelize } from 'sequelize-typescript';
import { Student } from '../students/student.entity'; // Assuming Student entity definition
import { Class } from 'classroom-management/src/classes/class.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE', // This token will be used for dependency injection
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Yagllo21!', // Replace with your actual password
        database: 'classroom_manegment', // Replace with your actual database name
      });

      sequelize.addModels([Student,Class]); // Add all models/entities here

      await sequelize.sync(); // Sync all defined models to the database

      return sequelize;
    },
  },
];
