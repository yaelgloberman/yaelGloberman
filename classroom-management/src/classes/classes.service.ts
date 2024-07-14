import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.sto';
import { ClassRepository } from './class.repository';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    return this.classRepository.createClass(createClassDto);
  }

  async getAllClasses(): Promise<Class[]> {
    const classes = await this.classRepository.getAllClasses();
    if (!classes) {
      throw new HttpException('classes not found', HttpStatus.NOT_FOUND);
    }
    return classes;
  }
  
  async getAvailableClasses(): Promise<Class[]> {
    const classes = await this.classRepository.getAvailableClasses();
    if (!classes) {
      throw new HttpException('classes not found', HttpStatus.NOT_FOUND);
    }
    return classes;
  }
  async getClassById(id: number): Promise<Class> {
    const classObjest = await this.classRepository.getClassById(id);
    if (!classObjest) {
      throw new HttpException('class not found', HttpStatus.NOT_FOUND);
    }
    return classObjest;
  }

  async assignToClass(classId: number) {
    await this.classRepository.assignToClass(classId);
  }
  async dismissFromClass(classId: number) {
    await this.classRepository.dismissFromClass(classId);
  }
  

    async deleteClass(id: number) {

      const classObject = await this.classRepository.getClassById(id);
      if (classObject) {      
        await this.classRepository.deleteClass(id);
        return true;
      } else {
        throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
      }
    
    }

}
