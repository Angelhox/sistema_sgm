import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/commons/service.commons';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './persona.entity';
import { createPersonaDto } from './dto/persona.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PersonaService extends BaseService<Persona> {
  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
  ) {
    super();
  }
  getRepository(): Repository<Persona> {
    return this.personaRepository;
  }
  async createPersona(persona: createPersonaDto) {
    const newData = this.personaRepository.create(persona);
    return this.personaRepository.save(newData);
  }
  async getPersona(cedula: string) {
    const DataFound = await this.personaRepository.findOne({
      where: {
        cedula,
      },
    });
    if (!DataFound) {
      return new HttpException('Persona no encontrada', HttpStatus.NOT_FOUND);
    }
    return DataFound;
  }
  async deletePersona(id: number) {
    const result = await this.personaRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Persona not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async updatePersona(id: number, persona: createPersonaDto) {
    const dataFound = await this.personaRepository.findOne({
      where: {
        id,
      },
    });
    if (!dataFound) {
      return new HttpException('Persona not found', HttpStatus.NOT_FOUND);
    }
    const updateData = Object.assign(dataFound, persona);
    return this.personaRepository.save(updateData);
  }
}
