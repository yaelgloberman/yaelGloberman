import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentRepository {
  async getStudentById(id: string) {
    return await Student.findByPk(id);
  }

  async getAllStudents() {
    return await Student.findAll();
  }

  async createStudent(newStudent: CreateStudentDto) {
    return Student.create(newStudent);
  }

  async asignStudentToClass(id: string, classId: number) {
    await Student.update({ classId: classId }, { where: { id } });
  }

  async unAsignStudentFronClass(id: string) {
    const student = await Student.update({ classId: null }, { where: { id } });
    return student;
  }

  async deleteStudent(id: string) {
    return await Student.destroy({
      where: { id },
    });
  }
}
