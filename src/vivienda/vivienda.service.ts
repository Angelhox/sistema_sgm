import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createViviendaDto, updateViviendaDto } from './vivienda.dto';
import { Vivienda } from './vivienda.entity';

@Injectable()
export class ViviendaService {
  constructor(
    @InjectRepository(Vivienda)
    private viviendaRepository: Repository<Vivienda>,
  ) {}
  async createVivienda(vivienda: createViviendaDto) {
    const newData = this.viviendaRepository.create(vivienda);
    return this.viviendaRepository.save(newData);
  }
  async getVivienda(id: number) {
    const DataFound = await this.viviendaRepository.findOne({
      where: {
        id,
      },
    });
    if (!DataFound) {
      return new HttpException('Vivienda no encontrada', HttpStatus.NOT_FOUND);
    }
  }
  async deleteVivienda(id: number) {
    const result = await this.viviendaRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Vivienda not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async updateVivienda(id: number, vivienda: updateViviendaDto) {
    const dataFound = await this.viviendaRepository.findOne({
      where: {
        id,
      },
    });
    if (!dataFound) {
      return new HttpException('Vivienda not found', HttpStatus.NOT_FOUND);
    }
    const updateData = Object.assign(dataFound, vivienda);
    return this.viviendaRepository.save(updateData);
  }
}
