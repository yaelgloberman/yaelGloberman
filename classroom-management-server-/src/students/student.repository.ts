import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentRepository {
  async getStudentById(id: string) {
    return await Student.findByPk(id);
  }

  async getAllStudents() {
    return await Student.findAll({
      order: ['firstName'],
    });
  }

  async createStudent(newStudent: CreateStudentDto) {
    return Student.create(newStudent);
  }

  async asignStudentToClass(id: string, classId: number) {
    await Student.update({ classId: classId }, { where: { id } });
  }

  async unAsignStudentFronClass(id: string) {
    await Student.update({ classId: null }, { where: { id } });
  }

  async deleteStudent(id: string) {
    await Student.destroy({
      where: { id },
    });
  }
}
