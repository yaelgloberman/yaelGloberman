import { IsString, IsInt } from 'class-validator';

export class CreateClassDto {
  @IsInt()
  id: number;

  @IsString()
  className: string;

  @IsInt()
  numberOfPlaces: number;

  @IsInt()
  remainingPlaces: number;
}
