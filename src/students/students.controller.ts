import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      return await this.studentService.create(createStudentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const student = await this.studentService.findOne(id);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    const student = await this.studentService.update(id, updateStudentDto);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.studentService.remove(id);
    if (!deleted) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return { deleted: true };
  }
}
