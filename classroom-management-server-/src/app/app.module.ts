import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from '../students/student.entity';
import { StudentModule } from '../students/student.module';
import { ClassModule } from '../classes/class.module';
import { ConfigModule } from '@nestjs/config';
import { Class } from 'src/classes/class.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Student]),
    StudentModule,
    SequelizeModule.forFeature([Class]),
    ClassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
