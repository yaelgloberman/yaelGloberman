import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';
import { ClassService } from 'src/classes/classes.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentsRepository: StudentRepository,
    @Inject(forwardRef(() => ClassService))
    private readonly classesService: ClassService,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      await this.studentsRepository.createStudent(createStudentDto);
    } catch (error) {
      throw new HttpException(
        'Student already exist choose diffrent id',
        HttpStatus.CONFLICT,
      );
    }
  }
  async getStudentById(id: string): Promise<Student> {
    try {
      return await this.studentsRepository.getStudentById(id);
    } catch (error) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAllStudents(): Promise<Student[]> {
    try {
      return await this.studentsRepository.getAllStudents();
    } catch (error) {
      throw new HttpException(
        'Students not found / empty',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async asignStudentToClass(
    id: string,
    classId: number,
    updateStudentDto: UpdateStudentDto,
  ) {
    const student = await this.studentsRepository.getStudentById(id);
    const classObj = await this.classesService.getClassById(classId);
    if (student && classObj) {
      await this.studentsRepository.asignStudentToClass(id, classId);
    } else {
      throw new HttpException(
        'stuent or class not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteStudent(id: string) {
    try {
      await this.studentsRepository.deleteStudent(id);
    } catch (error) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
  }
}
