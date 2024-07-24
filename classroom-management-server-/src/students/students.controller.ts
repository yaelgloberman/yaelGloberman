import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.createStudent(createStudentDto);
  }

  @Get(':id')
  async getStudentById(@Param('id') id: number) {
    return await this.studentService.getStudentById(id);
  }

  @Get()
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }
  
  @Get('/allStudentInClass/:classId')
  async getAllStudentsInClass(@Param('classId') id: number) {
    return await this.studentService.getAllStudentsInClass(id);
  }


  @Put(':id/:classId')
  async asignStudentToClass(@Param('id') id: number, @Param('classId') classId: number) {
    return await this.studentService.asignStudentToClass(id, classId);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: number) {
    return await this.studentService.deleteStudent(id);
  }
  
}