import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.sto';
import { Op } from 'sequelize';
import { Student } from 'src/students/student.entity';

@Injectable()
export class ClassRepository {
  async getClassById(id: number) {
    return await Class.findByPk(id);
  }
  async getAllClasses() {
    return await Class.findAll({ order: ['className'] });
  }
  async getAvailableClasses() {
    const availableClasses = await Class.findAll({
      where: {
        remainingPlaces: { [Op.gt]: 0 },
      },
      order: ['className']
    });
    return availableClasses;
  }

  async createClass(newClass: CreateClassDto) {
    return Class.create(newClass);
  }
  async assignToClass(id: number) {
    const classObject = await this.getClassById(id);
    const updatedClass = await Class.update(
      { remainingPlaces: classObject.remainingPlaces - 1 },
      { where: { id }, returning: true },
    );
    return updatedClass;
  }
  async dismissFromClass(id: number) {
    const classObject = await this.getClassById(id);
    const updatedClass = await Class.update(
      { remainingPlaces: classObject.remainingPlaces + 1 },
      { where: { id }, returning: true },
    );
    return updatedClass;
  }
  async deleteStudentFromClass(classId: number, student: Student) {
    const classObject = await this.getClassById(classId);
    const updateClass = await this.dismissFromClass(classId);
    return updateClass;
  }

  async deleteClass(id: number) {
    const classObject = await this.getClassById(id);
    if (classObject) {
      await classObject.destroy();
      return true;
    }
    return false;
  }
}
