import { Injectable } from '@nestjs/common';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import sequelize, { Op } from 'sequelize';
import { Student } from 'src/students/student.entity';

@Injectable()
export class ClassRepository {
  async getClassById(id: number) {
    return await Class.findByPk(id, {
      include: [
        {
          model: Student,
        },
      ],
    });
  }
 
  async getAllClasses() {
    return await Class.findAll({
      order: ['className'],
      include: [
        {
          model: Student,
        },
      ],
    });
  }

  async createClass(newClass: CreateClassDto) {
    return Class.create(newClass);
  }

  async getAvailableClasses() {
    const classes = await Class.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(
              '"Class"."numberOfPlaces" - COUNT("students"."id")',
            ),
            'emptyPlaces',
          ],
        ],
      },
      include: [
        {
          model: Student,
          attributes: [],
        },
      ],
      group: ['Class.id'],
      having: sequelize.literal(
        '"Class"."numberOfPlaces" - COUNT("students"."id") > 0',
      ),
      raw: true,
    });
    return classes;
  }

  
  async deleteClass(id: number) {
    const classObject = await this.getClassById(id);
    if (classObject) {
      await classObject.destroy();
    }
  }
}
