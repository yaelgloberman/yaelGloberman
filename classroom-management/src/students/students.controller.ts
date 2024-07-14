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
import { StudentService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';

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

  // @Put(':id')
  // async updateStudent(
  //   @Param('id') id: number,
  //   @Body() updateStudentDto: UpdateStudentDto,
  // ) {
  //   const student = await this.studentService.updateStudent(
  //     id,
  //     updateStudentDto,
  //   );

  //   if (!student) {
  //     throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
  //   }
  //   return student;
  // }

  @Put(':id/:classId')
  async asignToClass(
    @Param('id') id: number,
    @Param('classId') classId: number,
  ) {
    return await this.studentService.asignToClass(id, classId);
  }

  @Delete(':id')
  async deleteStudent(
    @Param('id') id: number) {
    return await this.studentService.deleteStudent(id);
  }
}
