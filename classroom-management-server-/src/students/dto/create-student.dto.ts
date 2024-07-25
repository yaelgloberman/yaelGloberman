import { IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {

  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsString()
  profession: string;

  @IsNumber()
  assignToClass: number;
}
