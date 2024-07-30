import {
  IsString,
  IsNumber,
  IsIdentityCard,
  IsOptional,
} from 'class-validator';

export class CreateStudentDto {
  @IsIdentityCard('he-IL')
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsString()
  profession: string;

  @IsOptional()
  @IsNumber()
  classId?: number;
}
