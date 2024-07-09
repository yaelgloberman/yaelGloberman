import { Injectable, Inject } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student)
    private readonly studentModel: typeof Student,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentModel.create(createStudentDto);
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.findAll();
  }

  async findOne(id: number): Promise<Student> {
    return this.studentModel.findByPk(id);
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
