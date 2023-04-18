import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createFamiliaresDto, updateFamiliaresDto } from './familiares.dto';
import { Familiares } from './familiares.entity';

@Injectable()
export class FamiliaresService {
  constructor(
    @InjectRepository(Familiares)
    private familiaresRepository: Repository<Familiares>,
  ) {}
  async createFamiliares(familiares: createFamiliaresDto) {
    const newData = this.familiaresRepository.create(familiares);
    return this.familiaresRepository.save(newData);
  }
  async getFamiliares(id: number) {
    const DataFound = await this.familiaresRepository.findOne({
      where: {
        id,
      },
    });
    if (!DataFound) {
      return new HttpException(
        'Familiares no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async deleteUsuario(id: number) {
    const result = await this.familiaresRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Familiares not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async updateUsuario(id: number, familiares: updateFamiliaresDto) {
    const dataFound = await this.familiaresRepository.findOne({
      where: {
        id,
      },
    });
    if (!dataFound) {
      return new HttpException('Familiares not found', HttpStatus.NOT_FOUND);
    }
    const updateData = Object.assign(dataFound, familiares);
    return this.familiaresRepository.save(updateData);
  }
}
