/* eslint-disable prettier/prettier */
import { IsString, IsDate } from 'class-validator';

export class createAdminDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  token: string;
  @IsString()
  authStrategy: string;
  @IsDate()
  createdAt: Date;
  @IsString()
  role: string;
}
export class updateAdminDto{
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  authStrategy: string;
  @IsDate()
  createdAt: Date;
  @IsString()
  role: string;
}
