import { IsString, IsInt } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  age: number;

  @IsString()
  profession: string;
}
