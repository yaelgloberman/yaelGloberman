import { IsString, IsNumber, IsIdentityCard } from 'class-validator';

export class CreateStudentDto {
  
  @IsIdentityCard('he-IL')
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsString()
  profession: string;

  @IsNumber()
  classId: number;
}
