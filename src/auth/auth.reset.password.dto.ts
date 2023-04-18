/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class requestResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;
}
