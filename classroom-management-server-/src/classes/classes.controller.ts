import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
     await this.classService.createClass(createClassDto);
  }

  @Get()
  async getAllClasses() {
    return await this.classService.getAllClasses();
  }

  @Get('/availableClasses')
  async getAvailableClasses() {
    return await this.classService.getAvailableClasses();
  }

  @Get(':id')
  async getClassById(@Param('id') id: number) {
    return await this.classService.getClassById(id);
  }

  @Delete(':id')
  async deleteClass(@Param('id') id: number) {
    await this.classService.deleteClass(id);
  }
}
