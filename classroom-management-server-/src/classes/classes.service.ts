import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Class } from './class.entity';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassService {
  constructor(
    private readonly classRepository: ClassRepository,
  ) {}

  async getAllClasses(): Promise<Class[]> {
    try {
      return await this.classRepository.getAllClasses();
    } catch (error) {
      throw new HttpException('classes not found', HttpStatus.NOT_FOUND);
    }
  }


  async createClass(createClassDto: CreateClassDto) {
    try {
      await this.classRepository.createClass(createClassDto);
    } catch (error) {
      throw new HttpException(
        'Class not created choose diffrent id',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAvailableClasses(): Promise<Class[]> {
    try {
      return await this.classRepository.getAvailableClasses();
    } catch (error) {
      throw new HttpException('classes not found', HttpStatus.NOT_FOUND);
    }
  }
  async getClassById(id: number): Promise<Class> {
    try {
      return await this.classRepository.getClassById(id);
    } catch (error) {
      throw new HttpException('class not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteClass(id: number) {
    try {
      const myClass = await this.classRepository.getClassById(id);

      if (!myClass) {
        throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
      }

      if (myClass.students.length > 0) {
        throw new HttpException(
          'Cannot delete class when students are assigned',
          HttpStatus.CONFLICT,
        );
      }

      await this.classRepository.deleteClass(id);
    } catch (error) {
      throw error instanceof HttpException
        ? error
        : new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
    }
  }
}
