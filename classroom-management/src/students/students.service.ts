import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { ClassService } from 'classroom-management/src/classes/classes.service';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentsRepository: StudentRepository,
    private readonly classesServise: ClassService,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const student =
        await this.studentsRepository.createStudent(createStudentDto);
      return student;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
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

  // async updateStudent(
  //   id: number,
  //   updateStudentDto: UpdateStudentDto,
  // ): Promise<Student> {
  //   const student = await this.studentsRepository.getStudentById(id);
  //   if (student) {
  //     await student.update(updateStudentDto);
  //     return student;
  //   }
  //   return null;
  // }

  async asignToClass(id: number, classId: number) {
    const student = await this.studentsRepository.getStudentById(id);
    const classObj = await this.classesServise.getClassById(classId);
    if (student && classObj) {
      const [updatedStudent] = await this.studentsRepository.assignToClass(
        id,
        classId,
      );
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
      throw new HttpException(' not updated', HttpStatus.NOT_FOUND);
    }
  }
  async dismissFromClass(id: number, classId: number) {
    const student = await this.studentsRepository.getStudentById(id);
    const classObj = await this.classesServise.getClassById(classId);
    if (student && classObj) {
      const [updatedStudent] = await this.studentsRepository.assignToClass(
        id,
        classId,
      );
      if (updatedStudent > 0) {
        await this.classesServise.dismissFromClass(classId);
        return 'updated successfully';
      } else {
        throw new HttpException(
          'Failed to update student assignment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(' not updated', HttpStatus.NOT_FOUND);
    }
  }
  async deleteStudent(id: number): Promise<boolean> {
    const student = await this.studentsRepository.getStudentById(id);
    if (student) {      
      await this.classesServise.dismissFromClass(student.assignToClass);
      await student.destroy();
      return true;
    } else {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
  }
}
