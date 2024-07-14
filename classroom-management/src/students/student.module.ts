import { Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import { studentsProviders } from './student.providers';
import { ClassModule } from 'classroom-management/src/classes/class.module';
import { StudentRepository } from './student.repository';

@Module({
  controllers: [StudentController],
  imports:[ClassModule],
  providers: [StudentRepository, StudentService, ...studentsProviders],
})
export class StudentModule {}
