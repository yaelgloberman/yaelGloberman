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
import { UpdateStudentDto } from './dto/update-student.dto'; 

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

  async getStudentById(id: number): Promise<Student> {
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
  async getAllStudentsInClass(id: number): Promise<Student[]> {
    const students = await this.studentsRepository.getAllStudentsInClass(id);
    if (!students) {
      throw new HttpException(
        'Students not found / empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return students;
  }

  async updateStudent(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentsRepository.getStudentById(id);
    if (student) {
      await student.update(updateStudentDto);
      return student;
    }
    return null;
  }

  async asignStudentToClass(id: number, classId: number) {
    const student = await this.studentsRepository.getStudentById(id);
    const classObj = await this.classesServise.getClassById(classId);
    if (student && classObj) {
      const [updatedStudent] =
        await this.studentsRepository.asignStudentToClass(id, classId);
      if (updatedStudent > 0) {
        await this.classesServise.assignToClass(classId);
        return 'updated successfully';
      } else {
        throw new HttpException(
          'Failed to update student assignment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        'stuent or class not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async dismissFromClass(classId: number, studentId: number) {
    const student = await this.studentsRepository.getStudentById(studentId);
    const classObj = await this.classesServise.getClassById(classId);

    if (student && classObj) {
      const [updatedStudent] =
        await this.studentsRepository.unAsignStudentFronClass(studentId);
      if (updatedStudent > 0) {
        return 'updated successfully';
      } else {
        throw new HttpException(
          'Failed to update student assignment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        'stuent or class not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteStudent(id: number): Promise<boolean> {
    const student = await this.studentsRepository.getStudentById(id);
    if (student) {
      if (student.assignToClass) {
        await this.classesServise.dismissFromClass(student.assignToClass);
      }
      await student.destroy();
      return true;
    } else {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
  }
}
