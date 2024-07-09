import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Student } from '../students/student.entity';
import { StudentModule } from '../students/student.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Yagllo21!',
      database: 'classroom_manegment',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Student]),
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


