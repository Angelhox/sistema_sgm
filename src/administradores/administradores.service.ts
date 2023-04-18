import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createPersonaDto,
  updatePersonaDto,
} from 'src/persona/dto/persona.dto';
import { Persona } from 'src/persona/persona.entity';
import { PersonaService } from 'src/persona/persona.service';
import { Repository } from 'typeorm';
import { createAdminDto, updateAdminDto } from './administradores.dto';
import { Administrador } from './administradores.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AdministradoresService {
  constructor(
    @InjectRepository(Administrador)
    private adminRepository: Repository<Administrador>,
    private personaService: PersonaService,
  ) {}
  async createAdministrador(
    administrador: createAdminDto,
    persona: createPersonaDto,
  ) {
    const personaCreated = await this.personaService.createPersona(persona);
    const newData = this.adminRepository.create(administrador);
    await this.adminRepository.save(newData);
    this.adminRepository.query(
      'update administradores set personaId =' +
        '(select id from persona order by id desc limit 1)' +
        'where administradores.id= ' +
        '(select id from(select id from administradores order by id desc limit 1) as c);',
    );
    return newData;
  }
  async getAdministrador(id: number) {
    return await this.adminRepository.findOne({
      where: {
        id,
      },
    });
  }
  async deleteAdministrador(id: number) {
    const result = await this.adminRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Asocianot found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async updateAdministrador(id: number, administrador: updateAdminDto) {
    const dataFound = await this.adminRepository.findOne({
      where: {
        id,
      },
    });
    if (!dataFound) {
      return new HttpException('Asociacion not found', HttpStatus.NOT_FOUND);
    }
    const updateData = this.adminRepository.update(id, administrador);
    return updateData;
  }
  async createPersonaAdministrador(
    administrador: createAdminDto,
    persona: createPersonaDto,
    idPersona: number,
  ) {
    if (idPersona === null) {
      const personaCreated = await this.personaService.createPersona(persona);
      const newData = this.adminRepository.create(administrador);
      await this.adminRepository.save(newData);
      this.adminRepository.query(
        'update administradores set personaId =' +
          '(select id from persona order by id desc limit 1)' +
          'where administradores.id= ' +
          '(select id from(select id from administradores order by id desc limit 1) as c);',
      );
      return newData;
    } else {
      const newData = this.adminRepository.create(administrador);
      await this.adminRepository.save(newData);
      this.adminRepository.query(
        'update administradores set personaId =' +
          idPersona +
          ' ' +
          'where administradores.id= ' +
          '(select id from(select id from administradores order by id desc limit 1) as c);',
      );
    }
  }
  async findByEmail(username: string) {
    const user: Administrador = await this.adminRepository.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      throw new NotFoundException('User with username ${username} not found');
    }
    return user;
  }
  async listarAdministradores() {
    const result = await this.adminRepository.query(
      'select persona.id,persona.nombre,persona.apellido,persona.cedula,persona.telefono,persona.correo,persona.direccion,' +
        'asociaciones.nombre as nombreAsociacion,administradores.username,' +
        'administradores.password,administradores.personaId,administradores.role from persona join administradores on persona.id=' +
        'administradores.personaId join usuarios on persona.id=usuarios.personaId join asociaciones ' +
        'on asociaciones.id=usuarios.asociacionId;',
    );
    return result;
  }
  async listarAdministradoresPorAsociacion(idAsoc: number) {
    const result = await this.adminRepository.query(
      'select persona.id,persona.nombre,persona.apellido,persona.cedula,persona.telefono,persona.correo,persona.direccion,' +
        'asociaciones.nombre as nombreAsociacion,administradores.username,' +
        'administradores.password,administradores.personaId,administradores.role from persona join administradores on persona.id=' +
        'administradores.personaId join usuarios on persona.id=usuarios.personaId join asociaciones ' +
        'on asociaciones.id=usuarios.asociacionId where asociaciones.id=' +
        idAsoc +
        ';',
    );
    return result;
  }
  async listarAdministradorPorAsociacion(idAsoc: number, idAdmin: number) {
    const result = await this.adminRepository.query(
      'select persona.id,persona.nombre,persona.apellido,persona.cedula,persona.telefono,persona.correo,persona.direccion,' +
        'asociaciones.nombre as nombreAsociacion,administradores.username,' +
        'administradores.password,administradores.personaId,administradores.role from persona join administradores on persona.id=' +
        'administradores.personaId join usuarios on persona.id=usuarios.personaId join asociaciones ' +
        'on asociaciones.id=usuarios.asociacionId where asociaciones.id=' +
        idAsoc +
        ' and administradores.id=' +
        idAdmin +
        ';',
    );
    return result;
  }
  async editarAdiministrador(
    idAdmin: number,
    administrador: updateAdminDto,
    persona: createPersonaDto,
  ) {
    const nuevaPassword = await bcrypt.hash(administrador.password, 8);
    const result = await this.adminRepository.query(
      "update administradores set username= '" +
        administrador.username +
        "',password= '" +
        nuevaPassword +
        "' where administradores.id=" +
        idAdmin +
        ';',
    );
    const resultPersona = await this.adminRepository.query(
      "update persona set nombre='" +
        persona.nombre +
        "',apellido='" +
        persona.apellido +
        "',direccion='" +
        persona.direccion +
        "',telefono='" +
        persona.telefono +
        "',correo='" +
        persona.correo +
        "' where persona.id=(Select administradores.personaId from administradores where administradores.id=" +
        idAdmin +
        ');',
    );
    return result;
  }
  async asociacionDelAdministrador(id: number) {
    const result = await this.adminRepository.query(
      'select administradores.role,persona.id,' +
        'persona.nombre,persona.apellido,usuarios.asociacionId' +
        ' from administradores join persona on administradores.personaId=' +
        'persona.id join usuarios' +
        ' on usuarios.personaId=persona.id where administradores.id=' +
        id +
        ';',
    );
    return result;
  }
}
