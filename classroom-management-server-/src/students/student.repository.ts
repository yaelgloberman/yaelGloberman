import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentRepository {
  async getStudentById(id: number) {
    return await Student.findByPk(id);
  }
  async getAllStudents() {
    return await Student.findAll();
  }
  async getAllStudentsInClass(id:number) {
    const students= await Student.findAll({
      where:{
        assignToClass: id
      }
    })
    
    return students
  }
  async createStudent(newStudent: CreateStudentDto) {
    const existingStudent = await Student.findOne({
      where: {
        id: newStudent.id,
      },
    });
    if (existingStudent) {
      throw new ConflictException('Student already exists');
    }
    return Student.create(newStudent);
  }

  async asignStudentToClass(id: number, classId: number) {
    const student = await Student.update(
      { assignToClass: classId },
      { where: { id }, returning: true },
    );
    return student;
  }
  async unAsignStudentFronClass(id: number) {
    const student = await Student.update(
      { assignToClass: null },
      { where: { id } ,returning: true},
    );
    return student;
  }
}
