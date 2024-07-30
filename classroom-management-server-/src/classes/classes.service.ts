import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Class } from './class.entity';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  async getAllClasses(): Promise<Class[]> {
    try {
      return await this.classRepository.getAllClasses();
    } catch (error) {
      throw new NotFoundException('Classes not found');

    }
  }

  async createClass(createClassDto: CreateClassDto) {
    try {
      await this.classRepository.createClass(createClassDto);
    } catch (error) {
      throw new ConflictException('Class not created choose diffrent id');
    }
  }

  async getAvailableClasses(): Promise<Class[]> {
    try {
      return await this.classRepository.getAvailableClasses();
    } catch (error) {
      throw new NotFoundException('Classes not found');
    }
  }
  async getClassById(id: number): Promise<Class> {
    try {
      return await this.classRepository.getClassById(id);
    } catch (error) {
      throw new NotFoundException('Class not found');
    }
  }

  async deleteClass(id: number) {
    try {
      const myClass = await this.classRepository.getClassById(id);

      if (!myClass) {
        throw new NotFoundException('class not found');
      }

      if (myClass.students.length > 0) {
        throw new ConflictException(
          'Cannot delete class when students are assigned',
        );
      }
      await this.classRepository.deleteClass(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
