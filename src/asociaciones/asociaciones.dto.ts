/* eslint-disable prettier/prettier */
import { IsDate, IsString } from 'class-validator';
export class createAsocDto {
  @IsString()
  nombre: string;
  @IsString()
  ruc: string;
  @IsString()
  lugarAutorizado: string;
  @IsString()
  direccionLugarAutorizado: string;
  @IsString()
  cede: string;
  @IsString()
  direccionCede: string;
  @IsString()
  telefono: string;
  @IsString()
  correo: string;
  @IsString()
  legalizada: string;
  @IsString()
  documentoLegalizacion: string;
  @IsDate()
  fechaCreacion: Date;
  @IsString()
  tipoContribuyente: string;
}
export class updateAsocDto {
    @IsString()
    ruc: string;
    @IsString()
    nombre: string;
    @IsString()
    lugarAutorizado: string;
    @IsString()
    direccionLugarAutorizado: string;
    @IsString()
    cede: string;
    @IsString()
    direccionCede: string;
    @IsString()
    telefono: string;
    @IsString()
    correo: string;
    @IsString()
    legalizada: string;
    @IsString()
    documentoLegalizacion: string;
    @IsDate()
    fechaCreacion: Date;
    @IsString()
    tipoContribuyente: string;
}
