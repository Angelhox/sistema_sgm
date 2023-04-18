import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdministradoresService } from 'src/administradores/administradores.service';
import { JwtService } from '@nestjs/jwt';
import { authLoginDto } from './auth-login.dto';
import { requestResetPasswordDto } from './auth.reset.password.dto';
import { adminRepository } from 'src/administradores/administradores.repository';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Administrador } from 'src/administradores/administradores.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AdministradoresService,
    private adminRepository: adminRepository,
    private JwtService: JwtService,
  ) {}
  async login(authLoginDto: authLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const payload = {
      userId: user.id,
      role: user.role,
    };
    return {
      access_token: this.JwtService.sign(payload),
      decode: this.JwtService.decode(this.JwtService.sign(payload)),
      verify: this.JwtService.verifyAsync(this.JwtService.sign(payload)),
    };
  }
  async validateUser(authLoginDto: authLoginDto) {
    const { username, password } = authLoginDto;
    const user = await this.usersService.findByEmail(username);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }
    return user;
  }
  async decodeToken(token: string) {
    const decoded = this.JwtService.decode(token);
    console.log(decoded);
    return {
      decoded,
    };
  }
  async requestResetPassword(
    requestResetPasswordDto: requestResetPasswordDto,
  ): Promise<void> {
    const { username } = requestResetPasswordDto;
    const user: Administrador = await this.usersService.findByEmail(username);
    user.resetPasswordToken = v4();
    this.adminRepository.save(user);
  }
}
