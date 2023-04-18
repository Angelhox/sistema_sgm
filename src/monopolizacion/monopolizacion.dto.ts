/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';

export class createMonopolizacionDto {
  @IsNumber()
  asociacion: number;
  @IsNumber()
  usuario: number;
}
