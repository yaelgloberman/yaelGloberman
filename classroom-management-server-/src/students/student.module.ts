import { Module, forwardRef } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentService } from './students.service';
import { studentsProviders } from './student.providers';
import { StudentRepository } from './student.repository';
import { ClassModule } from 'src/classes/class.module';

@Module({
  controllers: [StudentController],
  exports:[StudentService],
  imports: [forwardRef(() => ClassModule)], // Add this line
  providers: [StudentRepository, StudentService, ...studentsProviders],
})
export class StudentModule {}
