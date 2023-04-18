import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdministradoresModule } from 'src/administradores/administradores.module';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { Administrador } from 'src/administradores/administradores.entity';
import { adminRepository } from 'src/administradores/administradores.repository';

@Module({
  imports: [
    AdministradoresModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        //secret: process.env.JWT_SECRET
        secret: 'ilovemypets32122',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, adminRepository],
})
export class AuthModule {}
