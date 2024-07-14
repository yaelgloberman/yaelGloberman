import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CLASS } from 'classroom-management/src/common/constants';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.sto';
import { Op } from 'sequelize';

@Injectable()
export class ClassRepository {
  async getClassById(id: number) {
    return await Class.findByPk(id);
  }
  async getAllClasses() {
    return await Class.findAll();
  }
  async getAvailableClasses() {
    const availableClasses = await Class.findAll({
      where: {
        remainingPlaces: { [Op.gt]: 0 },
      },
    });
    return availableClasses;
  }

  async createClass(newClass: CreateClassDto) {
    const existingClass = await Class.findOne({
      where: {
        id: newClass.id,
      },
    });

    if (existingClass) {
      throw new ConflictException('Class already exists');
    }
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
  async deleteClass(id: number) {
    const classObject = await this.getClassById(id);
    if (classObject) {
      await classObject.destroy();
      return true;
    }
    return false;
  }
}
