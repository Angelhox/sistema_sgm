import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { createDirectivaDto } from 'src/directiva/directiva.dto';
import { createFamiliaresDto } from 'src/familiares/familiares.dto';
import { createGiroDto } from 'src/giros/giros.dto';
import { createPersonaDto } from 'src/persona/dto/persona.dto';
import { createViviendaDto } from 'src/vivienda/vivienda.dto';
import { createUsuarioDto } from './usuarios.dto';
import { Usuarios } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController extends BaseController<Usuarios> {
  constructor(private readonly usuariosService: UsuariosService) {
    super();
  }
  getService(): BaseService<Usuarios> {
    return this.usuariosService;
  }
  @Post()
  createUsuario(@Body() newUsuario: createUsuarioDto) {
    this.usuariosService.createUsuario(newUsuario);
  }
  @Post('guardarNuevoUsuario/:idAsociacion')
  updateDataUsuario(
    @Body() newPersona: createPersonaDto,
    @Body() newFamiliares: createFamiliaresDto,
    @Body() newVivienda: createViviendaDto,
    @Body() newGiro: createGiroDto,
    @Param('idAsociacion', ParseIntPipe) id: number,
    @Body() newUsuario: any,
  ) {
    this.usuariosService.updateDataUsuario(
      newPersona,
      newFamiliares,
      newVivienda,
      newGiro,
      id,
      newUsuario,
    );
  }
  @Post('usersDataDirectiva/:id')
  updateDataUsuarioDirectiva(
    @Body() newPersona: createPersonaDto,
    @Body() newFamiliares: createFamiliaresDto,
    @Body() newVivienda: createViviendaDto,
    @Body() newGiro: createGiroDto,
    @Body() newDirectiva: createDirectivaDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() newUsuario: any,
  ) {
    this.usuariosService.updateDataUsuarioDirectiva(
      newPersona,
      newFamiliares,
      newVivienda,
      newGiro,
      newUsuario,
      newDirectiva,
      id,
    );
  }
  @Get('getUsers')
  selectUsuariosData() {
    return this.usuariosService.selectDataUsuarios();
  }
  @Get('getDataUsers')
  selestUSuariosDatos() {
    return this.usuariosService.getUsuarios();
  }
  @Get('usuariosAsociacion/:id')
  listarUsuariosPorAsociacion(@Param('id', ParseIntPipe) idAsoc: number) {
    return this.usuariosService.listarUsuariosPorAsociacion(idAsoc);
  }
  @Get('usuariosDirectivaAsociacion/:idAsoc')
  listarUsuariosDirectivaPorAsociacion(
    @Param('idAsoc', ParseIntPipe) idAsoc: number,
  ) {
    return this.usuariosService.listarUsuariosDirectivaPorAsociacion(idAsoc);
  }
  @Get('usuariosNoDirectivaAsociacion/:idAsoc')
  listarUsuariosNoDirectivaPorAsociacion(
    @Param('idAsoc', ParseIntPipe) idAsoc: number,
  ) {
    return this.usuariosService.listarUsuariosNoDirectivaPorAsociacion(idAsoc);
  }
  @Get('usuarioNoDirectivaAsociacion/:idAsoc/:idUsuario')
  listarUsuarioNoDirectivaPorAsociacion(
    @Param('idAsoc', ParseIntPipe) idAsoc: number,
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  ) {
    return this.usuariosService.listarUsuarioNoDirectivaPorAsociacion(
      idAsoc,
      idUsuario,
    );
  }
  @Get('usuarioDirectivaAsociacion/:idAsoc/:idUser')
  listarUsuarioDirectivaPorAsociacion(
    @Param('idAsoc', ParseIntPipe) idAsoc: number,
    @Param('idUser', ParseIntPipe) idUser: number,
  ) {
    return this.usuariosService.listarUsuarioDirectivaPorAsociacion(
      idAsoc,
      idUser,
    );
  }
  @Get('selectUser/:id')
  async selectUser(@Param('id') id: number) {
    return await this.usuariosService.selectUserData(id);
  }
  @Get('selectUserDataCedula/:cedula/:idAsociacion')
  async selectUserDataCedula(
    @Param('cedula') cedula: number,
    @Param('idAsociacion') idAsociacion: number,
  ) {
    return await this.usuariosService.selectUserDataPorCedula(
      cedula,
      idAsociacion,
    );
  }
}
