import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from '../students/student.entity';
import { StudentModule } from '../students/student.module';
import { ClassModule } from '../classes/class.module';
import { Class } from 'classroom-management/src/classes/class.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: Number(process.env.DB_PORT),
      username: 'postgres',
      password: 'Yagllo21!',
      database: 'classroom_manegment',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Student]),
    StudentModule,
    SequelizeModule.forFeature([Class]),
    ClassModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


