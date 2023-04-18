import {
  Controller,
  Post,
  ParseIntPipe,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import {
  createPersonaDto,
  updatePersonaDto,
} from 'src/persona/dto/persona.dto';
import { createAdminDto, updateAdminDto } from './administradores.dto';
import { AdministradoresService } from './administradores.service';

@Controller('administradores')
export class AdministradoresController {
  constructor(
    private readonly administradoresService: AdministradoresService,
  ) {}
  @Post('adminData/:id')
  createPersonaAdministrador(
    @Body() newPersona: createPersonaDto,
    @Body() newAdministrador: createAdminDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.administradoresService.createPersonaAdministrador(
      newAdministrador,
      newPersona,
      id,
    );
  }
  @Post('adminPersonaData')
  createPersonaAdmin(
    @Body() newAdministrador: createAdminDto,
    @Body() newPersona: createPersonaDto,
  ) {
    this.administradoresService.createAdministrador(
      newAdministrador,
      newPersona,
    );
  }
  @Get('findByEmail/:username')
  findByEmail(@Param('username') username: string) {
    this.administradoresService.findByEmail(username);
  }
  @Get('Administradores')
  listarAdministradores() {
    return this.administradoresService.listarAdministradores();
  }
  @Get('administradoresAsociacion/:id')
  listarAdministradoresPorAsociacion(
    @Param('id', ParseIntPipe) idAsoc: number,
  ) {
    return this.administradoresService.listarAdministradoresPorAsociacion(
      idAsoc,
    );
  }
  @Get('administradorAsociacion/:id/:idAdmin')
  listarAdministradorPorAsociacion(
    @Param('id', ParseIntPipe) idAsoc: number,
    @Param('idAdmin', ParseIntPipe) idAdmin: number,
  ) {
    return this.administradoresService.listarAdministradorPorAsociacion(
      idAsoc,
      idAdmin,
    );
  }
  @Post('editarAdministrador/:idAdmin')
  editarAdministrador(
    @Param('idAdmin', ParseIntPipe) idAdmin: number,
    @Body() administrador: updateAdminDto,
    @Body() persona: updatePersonaDto,
  ) {
    return this.administradoresService.editarAdiministrador(
      idAdmin,
      administrador,
      persona,
    );
  }
  @Post('editar/:idAdmin')
  async editarAdmin(
    @Param('idAdmin') idAdmin: number,
    @Body() administrador: updateAdminDto,
  ) {
    return this.administradoresService.updateAdministrador(
      idAdmin,
      administrador,
    );
  }
  @Get('asociacionDelAdministrador/:idAdministrador')
  async asociacionDelAdministrador(
    @Param('idAdministrador') idAdministrador: number,
  ) {
    return this.administradoresService.asociacionDelAdministrador(
      idAdministrador,
    );
  }
}
