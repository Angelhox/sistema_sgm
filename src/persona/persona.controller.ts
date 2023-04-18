/* eslint-disable prettier/prettier */
import { Controller, Get,Post, Body, Param } from '@nestjs/common';
import {PersonaService} from './persona.service'
import { createPersonaDto } from './dto/persona.dto';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { Persona } from './persona.entity';
@Controller('persona')
export class personaController extends BaseController<Persona> {
  getService(): BaseService<Persona> {
    return this.personaService;
  }
  constructor(private readonly personaService: PersonaService) {
    super();
  }
  @Post()
  createPersona(@Body() newPersona: createPersonaDto){
    this.personaService.createPersona(newPersona);
  }
  @Get(':cedula')
  getPersonabyCedula(@Param('cedula') cedula:string){
  return this.personaService.getPersona(cedula);
  }
}
