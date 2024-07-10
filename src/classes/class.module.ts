import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassService } from './classes.service';
import { classesProviders } from './class.providers';
import { ClassRepository } from './class.repository';

@Module({
  controllers: [ClassesController],
  providers: [ClassRepository, ClassService, ...classesProviders],
  exports: [ClassService],
})
export class ClassModule {}
