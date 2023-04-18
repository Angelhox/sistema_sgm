import { Body, Controller, Param, Post, ParseIntPipe } from '@nestjs/common';
import { DirectivaService } from './directiva.service';
import { createDirectivaDto } from './directiva.dto';

@Controller('directiva')
export class DirectivaController {
  constructor(private readonly directivaService: DirectivaService) {}
  @Post('crearUsuarioDirectiva/:idUsuario')
  async crearUsuarioDirectiva(
    @Body() directiva: createDirectivaDto,
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  ) {
    const result = await this.directivaService.crearUsuarioDirectiva(
      idUsuario,
      directiva,
    );
    return result;
  }
}
