import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentRepository } from './student.repository';
import { ClassService } from 'src/classes/classes.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentsRepository: StudentRepository,
    @Inject(forwardRef(() => ClassService))
    private readonly classesServise: ClassService,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {   
    const studentAlreadyExist = await this.studentsRepository.getStudentById(
      createStudentDto.id,
    );
    if (studentAlreadyExist) {
      throw new HttpException(
        'Student already exist choose diffrent id',
        HttpStatus.CONFLICT,
      );
    }
    const student =
      await this.studentsRepository.createStudent(createStudentDto);
    return student;
  }

  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentsRepository.getStudentById(id);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    const students = await this.studentsRepository.getAllStudents();
    if (!students) {
      throw new HttpException(
        'Students not found / empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return students;
  }
  
  async asignStudentToClass(id: string, classId: number) {
    const student = await this.studentsRepository.getStudentById(id);
    const classObj = await this.classesServise.getClassById(classId);
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
    const student = await this.studentsRepository.getStudentById(id);
    if (student) {
      await student.destroy();
    } else {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
  }
}
