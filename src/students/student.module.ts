import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { Student } from './student.entity';

@Module({
  imports: [SequelizeModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
