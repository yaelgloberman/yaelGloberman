import { Module, forwardRef } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassService } from './classes.service';
import { classesProviders } from './class.providers';
import { ClassRepository } from './class.repository';
import { StudentModule } from 'src/students/student.module';

@Module({
  controllers: [ClassesController],
  providers: [ClassRepository, ClassService, ...classesProviders],
  exports: [ClassService],
  imports: [forwardRef(() => StudentModule)], // Add this line
})
export class ClassModule {}
