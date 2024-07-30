import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
  NotFoundException,
  ConflictException,
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
      throw new ConflictException(
        'Student already exist choose diffrent id',
      );
    }
  }
  async getStudentById(id: string): Promise<Student> {
    try {
      return await this.studentsRepository.getStudentById(id);
    } catch (error) {
      throw new NotFoundException('Stuents not found');
    }
  }

  async getAllStudents(): Promise<Student[]> {
    try {
      return await this.studentsRepository.getAllStudents();
    } catch (error) {
      throw new NotFoundException('Students not found');
    }
  }

  async asignStudentToClass(
    id: string,
    classId: number,
  ) {
    const student = await this.studentsRepository.getStudentById(id);
    const classObj = await this.classesService.getClassById(classId);
    if (student && classObj) {
      await this.studentsRepository.asignStudentToClass(id,classId);
    } else {
      throw new NotFoundException('Stuent or class not exist');
    }
  }

  async deleteStudent(id: string) {
    try {
      await this.studentsRepository.deleteStudent(id);
    } catch (error) {
      throw new NotFoundException('Could not delete student');
    }
  }
}
