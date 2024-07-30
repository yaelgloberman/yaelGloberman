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
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    await this.studentService.createStudent(createStudentDto);
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    return await this.studentService.getStudentById(id);
  }

  @Get()
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }

  @Put(':id/:classId')
  async asignStudentToClass(
    @Param('id') id: string,
    @Param('classId') classId: number,
    
  ) {
     await this.studentService.asignStudentToClass(id, classId);
  }


  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    await this.studentService.deleteStudent(id);
  }
}
