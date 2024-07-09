import { Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import { studentsProviders } from './student.providers';

@Module({
  controllers: [StudentController],
  providers: [StudentService, ...studentsProviders],
})
export class StudentModule {}
