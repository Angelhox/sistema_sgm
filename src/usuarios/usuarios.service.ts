/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createUsuarioDto,
  updateUsuarioDto,
} from './usuarios.dto';
import {
  createPersonaDto,
} from 'src/persona/dto/persona.dto';
import { PersonaService } from 'src/persona/persona.service';
import { FamiliaresService } from 'src/familiares/familiares.service';
import { createFamiliaresDto } from 'src/familiares/familiares.dto';
import { createViviendaDto } from 'src/vivienda/vivienda.dto';
import { ViviendaService } from 'src/vivienda/vivienda.service';
import { GirosService } from 'src/giros/giros.service';
import { createGiroDto } from 'src/giros/giros.dto'
import { createAsocDto } from 'src/asociaciones/asociaciones.dto';
import { AsociacionesService } from 'src/asociaciones/asociaciones.service';
import { createDirectivaDto } from 'src/directiva/directiva.dto';
import { DirectivaService } from 'src/directiva/directiva.service';
import { BaseService } from 'src/commons/service.commons';
@Injectable()
export class UsuariosService extends BaseService <Usuarios>{
  constructor(
    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
    private personaService: PersonaService,
    private familiaresService: FamiliaresService,
    private viviendaService: ViviendaService,
    private giroService: GirosService,
    private directivaService: DirectivaService,
    private asociacionesService: AsociacionesService,
    
  ) {super();}
  getRepository(): Repository<Usuarios> {
    return this.usuarioRepository;
  }
  

  async createUsuario(usuario: createUsuarioDto) {
    const DataFound = await this.usuarioRepository.findOne({
      where: {
        idCarnet: usuario.idCarnet,
      },
    });
    if (!DataFound) {
      return new HttpException(
        'Este usuario ya esta registrado',
        HttpStatus.CONFLICT,
      );
    }
    const newData = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(newData);
  }
  async getUsuario(idCarnet: string) {
    const DataFound = await this.usuarioRepository.findOne({
      where: {
        idCarnet,
      },
    });
    if (!DataFound) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }
  async deleteUsuario(id: number) {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Usuario not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async updateUsuario(id: number, usuario: updateUsuarioDto) {
    const dataFound = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
    if (!dataFound) {
      return new HttpException('Usuario not found', HttpStatus.NOT_FOUND);
    }
    const updateData = Object.assign(dataFound, usuario);
    return this.usuarioRepository.save(updateData);
  }
  /*async updateIdUsuario(
    usuario: updateIdUsuarioDto,
    persona: updateIdPersonaDto,
  ){};*/
  async updateDataUsuario(
    persona: createPersonaDto,
    familiares: createFamiliaresDto,
    vivienda: createViviendaDto,
    giro: createGiroDto,
    idAsociacion:number,
    usuario: createUsuarioDto,
  ) {
    const personaCreated = await this.personaService.createPersona(persona);
    const familiaresCreated = await this.familiaresService.createFamiliares(
      familiares,
    );
    const viviendaCreated = await this.viviendaService.createVivienda(vivienda);
    const giroCreated = await this.giroService.createGiro(giro);
    const usuarioCreated = await this.usuarioRepository.save(usuario);
    const usuarioId= await this.usuarioRepository.query('select id from usuarios order by id desc limit 1');
    this.usuarioRepository.query(
      'update usuarios set personaId=(Select id from persona order by id desc limit 1)' +
        ',familiaresId=(Select id from familiares order by id desc limit 1)' +
         ',viviendaId=(Select id from vivienda order by id desc limit 1)' +
          ',girosId=(Select id from giros order by id desc limit 1)'+
          ',asociacionId='+idAsociacion+' where usuarios.id = '+
          '(select id from(select id from usuarios order by id desc limit 1)as c);');
   
          return this.usuarioRepository.create(usuarioCreated);
  }
  async updateDataUsuarioDirectiva(
    persona: createPersonaDto,
    familiares: createFamiliaresDto,
    vivienda: createViviendaDto,
    giro: createGiroDto,
    usuario: createUsuarioDto,
    directiva: createDirectivaDto,
    idAsociacion:number,
  ) {
    const personaCreated = await this.personaService.createPersona(persona);
    const familiaresCreated = await this.familiaresService.createFamiliares(
      familiares,
    );
    const viviendaCreated = await this.viviendaService.createVivienda(vivienda);
    const giroCreated = await this.giroService.createGiro(giro);
    const directivaCreated= await this.directivaService.createDirectiva(directiva);
    const usuarioCreated = await this.usuarioRepository.save(usuario);
    this.usuarioRepository.query(
      'update usuarios set personaId=(Select id from persona order by id desc limit 1)' +
        ',familiaresId=(Select id from familiares order by id desc limit 1)' +
         ',viviendaId=(Select id from vivienda order by id desc limit 1)' +
          ',girosId=(Select id from giros order by id desc limit 1)'+
           ',directivaId=(Select id from directiva order by id desc limit 1)'+
           ',asociacionId='+idAsociacion+' where usuarios.id = '+
           '(select id from(select id from usuarios order by id desc limit 1)as c);');    
          return this.usuarioRepository.create(usuarioCreated);
   
          //Unfunctional line usuarioCreated.personaId = personaCreated.id;
  }
  async selectDataUsuarios(){
    this.usuarioRepository.query('select '+
    'persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,'+
    'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,'+
    'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,'+
    'vivienda.numeroDormitorios,'+
    'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,'+
    'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,'+
    'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,'+
    'usuarios.asociacionId from persona join usuarios on persona.id=usuarios.personaId join familiares on '+
    'familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId;')
  }
  async getUsuarios(){
    return await this.usuarioRepository.find()
  }
  async listarUsuariosPorAsociacion(idAsoc:number){
    const result = await this.usuarioRepository.query('select '+
    'usuarios.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,'+
    'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,'+
    'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,'+
    'vivienda.numeroDormitorios,'+
    'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,'+
    'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,'+
    'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,'+
    'usuarios.asociacionId from persona join usuarios on persona.id=usuarios.personaId join familiares on '+
    'familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId where usuarios.asociacionId='+idAsoc+' ;')
    return result;
  }
  async listarUsuariosDirectivaPorAsociacion(idAsoc:number){
    const result = await this.usuarioRepository.query(
      'select ' +
        'usuarios.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,' +
        'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,' +
        'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,' +
        'vivienda.numeroDormitorios,' +
        'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,' +
        'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,' +
        'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,' +
        'usuarios.asociacionId,directiva.cargo,directiva.fechaInicio,directiva.fechaFin from persona join  usuarios ' +
        'on persona.id=usuarios.personaId join directiva on directiva.id=usuarios.directivaId join familiares on ' +
        'familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId where usuarios.asociacionId=' +
        idAsoc +
        " and usuarios.esDirectiva='Si';",
    );
    return result;
    }
    async listarUsuariosNoDirectivaPorAsociacion(idAsoc:number){
      const result = await this.usuarioRepository.query(
        'select ' +
          'usuarios.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,' +
          'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,' +
          'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,' +
          'vivienda.numeroDormitorios,' +
          'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,' +
          'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,' +
          'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,' +
          'usuarios.asociacionId from persona join  usuarios ' +
          'on persona.id=usuarios.personaId join familiares on ' +
          'familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId where usuarios.asociacionId=' +
          idAsoc +
          " and usuarios.esDirectiva='No';",
      );
      return result;
      }
      async listarUsuarioNoDirectivaPorAsociacion(idAsoc:number,idUsuario:number){
        const result = await this.usuarioRepository.query(
          'select ' +
            'usuarios.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,' +
            'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,' +
            'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,' +
            'vivienda.numeroDormitorios,' +
            'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,' +
            'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,' +
            'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,' +
            'usuarios.asociacionId from persona join  usuarios ' +
            'on persona.id=usuarios.personaId join familiares on ' +
            'familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId where usuarios.asociacionId=' +
            idAsoc +
            " and usuarios.id="+idUsuario+" and usuarios.esDirectiva='No';",
        );
        return result;
        }
    async listarUsuarioDirectivaPorAsociacion(idAsoc:number,idUser:number){
      const result = await this.usuarioRepository.query(
        'select ' +
          'usuarios.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,' +
          'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,' +
          'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,' +
          'vivienda.numeroDormitorios,' +
          'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,' +
          'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,' +
          'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,' +
          'usuarios.asociacionId,directiva.cargo,directiva.fechaInicio,directiva.fechaFin from persona join  usuarios ' +
          'on persona.id=usuarios.personaId join directiva on directiva.id=usuarios.directivaId join familiares on ' +
          'familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId where usuarios.asociacionId=' +
          idAsoc +' and usuarios.id='+idUser+
          ';',
      );
      return result;
      }
      async selectUserData(id:any){
        const result= await this.usuarioRepository.query(
        'select '+
        'usuarios.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,'+
        'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,'+
        'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,'+
        'vivienda.numeroDormitorios,'+
        'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,'+
        'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,'+
        'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,'+
        'usuarios.asociacionId,giros.giro,giros.horarioAbierto,giros.horarioCerrado,giros.lugarAutorizado,giros.diasHorario,'+
        'giros.direccionLugarAutorizado from persona join usuarios on persona.id=usuarios.personaId join familiares on'+
        ' familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId join giros on usuarios.girosId='+
        'giros.id where usuarios.id='+id+';'
        );
        return result;
      }
      async selectUserDataPorCedula(cedula:any,idAsociacion:any){
        const result= await this.usuarioRepository.query(
        'select '+
        'usuarios.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,'+
        'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,'+
        'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,'+
        'vivienda.numeroDormitorios,'+
        'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,'+
        'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,'+
        'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,'+
        'usuarios.asociacionId,giros.giro,giros.horarioAbierto,giros.horarioCerrado,giros.lugarAutorizado,giros.diasHorario,'+
        'giros.direccionLugarAutorizado from persona join usuarios on persona.id=usuarios.personaId join familiares on'+
        ' familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId join giros on usuarios.girosId='+
        'giros.id where persona.cedula='+cedula+' and usuarios.asociacionId='+idAsociacion+';'
        );
        return result;
      }

}
