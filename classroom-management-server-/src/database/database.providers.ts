
import { Sequelize } from 'sequelize-typescript';
import { Student } from '../students/student.entity'; 
import { Class } from 'src/classes/class.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE', 
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Yagllo21!', 
        database: 'classroom_manegment', 
      });

      sequelize.addModels([Class,Student]); 

      await sequelize.sync(); 

      return sequelize;
    },
  },
];
