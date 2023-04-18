/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';
export class authLoginDto {
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
}
