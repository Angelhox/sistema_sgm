/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class createGiroDto {
  @IsString()
  giro: string;
  @IsString()
  horarioAbierto: string;
  @IsString()
  horarioCerrado: string;
  @IsString()
  lugarAuthorizado: string;
  @IsString()
  diasHorario: string;
  @IsString()
  direccionLugarAutorizado: string;
}
export class updateGiroDto {
  @IsString()
  giro: string;
  @IsString()
  horarioAbierto: string;
  @IsString()
  horarioCerrado: string;
  @IsString()
  lugarAuthorizado: string;
  @IsString()
  diasHorario: string;  
  @IsString()
  direccionLugarAutorizado: string;  
}
