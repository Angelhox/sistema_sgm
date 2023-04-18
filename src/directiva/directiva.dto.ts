/* eslint-disable prettier/prettier */
import { IsString, IsDate } from 'class-validator';
export class createDirectivaDto {
  @IsString()
  cargo: string; 
  @IsDate()
  fechaInicio: Date;
  @IsDate()
  fechaFin: Date;
}
export class updateDirectivaDto {
  @IsString()
  cargo: string;
  @IsDate()
  fechaInicio: Date;
  @IsDate()
  fechaFin: Date;
}
