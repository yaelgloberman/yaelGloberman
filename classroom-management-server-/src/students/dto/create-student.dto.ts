import { IsString, IsInt, IsIdentityCard } from 'class-validator';

export class CreateStudentDto {

  @IsIdentityCard("he-IL")
   id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  age: number;

  @IsString()
  profession: string;

  @IsInt()
  assignToClass: number;
}
