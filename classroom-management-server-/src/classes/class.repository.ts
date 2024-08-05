import { Class } from './class.entity';
import sequelize, { Op } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { Student } from 'src/students/student.entity';
import { CreateClassDto } from './dto/create-class.dto';

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
    Class.create(newClass);
  }

  async getAvailableClasses() {
    return await Class.findAll({
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
    
  }

  async deleteClass(id: number) {
     await Class.destroy({ where: { id } });
  }
}
