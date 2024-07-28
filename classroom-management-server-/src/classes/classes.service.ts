import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.sto';
import { ClassRepository } from './class.repository';
import { StudentService } from '../students/students.service';

@Injectable()
export class ClassService {
  constructor(
    private readonly classRepository: ClassRepository,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,
  ) {}

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    const classAlreadyExist = await this.classRepository.getClassById(
      createClassDto.id,
    );
    if (!classAlreadyExist) {
      return await this.classRepository.createClass(createClassDto);
    }
    throw new HttpException(
      'Class not created choose diffrent id',
      HttpStatus.CONFLICT,
    );
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

  async deleteStudentFromClass(classId: number, studentId: number) {
    await this.studentService.dismissFromClass(classId, studentId);
    return await this.classRepository.dismissFromClass(classId);
  }

  async updateClass(
    id: number,
    updateClassDto: UpdateClassDto,
  ): Promise<Class> {
    const classObject = await this.classRepository.getClassById(id);
    if (classObject) {
      await classObject.update(updateClassDto);
      return classObject;
    }
    return null;
  }
  async deleteClass(id: number): Promise<boolean> {
    const students = await this.studentService.getAllStudentsInClass(id);
    if (students.length == 0) {
      const classObjectExists = await this.classRepository.getClassById(id);
      if (classObjectExists) {
        await this.classRepository.deleteClass(id);
        return true;
      } else {
        throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
      }
    }
    throw new HttpException(
      'Cannot delete class when students are assigned',
      HttpStatus.CONFLICT,
    );
  }
}
