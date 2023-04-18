import { Controller, Post, Body, UseGuards, Get, Patch } from '@nestjs/common';
import { authLoginDto } from './auth-login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-authguard';
import { requestResetPasswordDto } from './auth.reset.password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() authLoginDto: authLoginDto) {
    return this.authService.login(authLoginDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success Login';
  }
  @Get('decode')
  async decode(@Body() token: string) {
    return this.authService.decodeToken(token);
  }
  @Patch('/request-reset-password')
  requestResetPassword(
    @Body() requestResetPassword: requestResetPasswordDto,
  ): Promise<void> {
    return this.authService.requestResetPassword(requestResetPassword);
  }
}
