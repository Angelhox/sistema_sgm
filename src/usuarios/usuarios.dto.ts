/* eslint-disable prettier/prettier */
import { IsString, IsDate, IsNumber } from 'class-validator';
export class createUsuarioDto {
  @IsString()
  carnetizado: string;
  @IsString()
  categoria: string;
  @IsString()
  registrado: string;
  @IsString()
  discapacidad: string;
  @IsString()
  idCarnetDiscapacidad: string;
  @IsString()
  idCarnet: string;
  @IsString()
  tipoDiscapacidad: string;
  @IsString()
  gradoDiscapacidad: string;
  @IsString()
  esDirectiva: string;
  @IsString()
  estadoCivil: string;
  @IsDate()
  fechaRegistro: string;
  @IsDate()
  fechaNacimiento: string;
  @IsNumber()
  personaId:number
}
export class updateUsuarioDto {
    @IsString()
    carnetizado: string;
    @IsString()
    categoria: string;
    @IsString()
    registrado: string;
    @IsString()
    discapacidad: string;
    @IsString()
    idCarnetDiscapacidad: string;
    @IsString()
    idCarnet: string;
    @IsString()
    tipoDiscapacidad: string;
    @IsString()
    gradoDiscapacidad: string;
    @IsString()
    esDirectiva: string;
    @IsString()
    estadoCivil: string;
    @IsDate()
    fechaRegistro: string;
    @IsDate()
    fechaNacimiento: string;
    @IsNumber()
    personaId:number
  }
  export class updateIdUsuarioDto{
    @IsNumber()
    id: number;
  }
  
