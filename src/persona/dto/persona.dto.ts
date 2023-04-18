/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class createPersonaDto {
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsString()
  cedula: string;
  @IsString()
  telefono: string;
  @IsString()
  correo: string;
  @IsString()
  direccion: string;
}
export class updatePersonaDto{
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsString()
  cedula: string;
  @IsString()
  telefono: string;
  @IsString()
  correo: string;
  @IsString()
  direccion: string;
}
export class updateIdPersonaDto{
  @IsNumber()
  id:number;
}