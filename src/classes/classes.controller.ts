import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.sto';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classService.createClass(createClassDto);
  }

  @Get()
  async getAllClasses() {
    return await this.classService.getAllClasses();
  }

  @Get('availableClasses')
  async getAvailableClasses() {
    return await this.classService.getAvailableClasses();
  }


  @Get(':id')
  async getClassById(@Param('id') id: number) {
    return await this.classService.getClassById(id);
  }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() updateClassDto: UpdateClassDto) {
  //   return await this.classService.updateClass(id, updateClassDto);

  // }

    @Delete(':id')
    async deleteClass(@Param('id') id: number) {
      return await this.classService.deleteClass(id);
      
    }
}
