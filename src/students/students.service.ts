import { Injectable, Inject } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENTS_REPOSITORY')
    private  studentsRepository: typeof Student,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsRepository.create(createStudentDto);
  }

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.findAll();
  }

  async findOne(id: number): Promise<Student> {
    return this.studentsRepository.findByPk(id);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    if (student) {
      await student.update(updateStudentDto);
      return student;
    }
    return null;
  }

  async remove(id: number): Promise<boolean> {
    const student = await this.findOne(id);
    if (student) {
      await student.destroy();
      return true;
    }
    return false;
  }
}
