/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
export class createViviendaDto {
  @IsString()
  propiedadVivienda: string;
  @IsString()
  aguaPotable: string;
  @IsString()
  luzElectrica: string;
  @IsString()
  servicioTelefono: string;
  @IsString()
  servicioInternet: string;
  @IsString()
  numeroDormitorios: string;
}
export class updateViviendaDto {
  @IsString()
  propiedadVivienda: string;
  @IsString()
  aguaPotable: string;
  @IsString()
  luzElectrica: string;
  @IsString()
  servicioTelefono: string;
  @IsString()
  servicioInternet: string;
  @IsString()
  numeroDormitorios: string;
}
