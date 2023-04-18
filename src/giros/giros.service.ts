import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createGiroDto } from './giros.dto';
import { Giros } from './giros.entity';

@Injectable()
export class GirosService {
  constructor(
    @InjectRepository(Giros)
    private girosRepository: Repository<Giros>,
  ) {}
  async createGiro(familiares: createGiroDto) {
    const newData = this.girosRepository.create(familiares);
    return this.girosRepository.save(newData);
  }
  async getGiro(id: number) {
    const DataFound = await this.girosRepository.findOne({
      where: {
        id,
      },
    });
    if (!DataFound) {
      return new HttpException('Giros no encontrada', HttpStatus.NOT_FOUND);
    }
  }
  async deleteGiro(id: number) {
    const result = await this.girosRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Giros not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async updateGiro(id: number, giros: createGiroDto) {
    const dataFound = await this.girosRepository.findOne({
      where: {
        id,
      },
    });
    if (!dataFound) {
      return new HttpException('Giros not found', HttpStatus.NOT_FOUND);
    }
    const updateData = Object.assign(dataFound, giros);
    return this.girosRepository.save(updateData);
  }
}
