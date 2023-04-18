/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class createFamiliaresDto {
  @IsString()
  jefeHogar: string;
  @IsString()
  numeroHijos: string;
  @IsString()
  numeroMiembros: string;
}
export class updateFamiliaresDto {
    @IsString()
    jefeHogar: string;
    @IsString()
    numeroHijos: string;
    @IsString()
    numeroMiembros: string;
  }
  
