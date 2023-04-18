import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directiva } from './directiva.entity';
import { createDirectivaDto } from './directiva.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class DirectivaService {
  constructor(
    @InjectRepository(Directiva)
    private directivaRepository: Repository<Directiva>,
  ) {}
  async createDirectiva(directiva: createDirectivaDto) {
    const newDirectiva = this.directivaRepository.create(directiva);
    await this.directivaRepository.save(newDirectiva);
    return newDirectiva;
  }
  async getDirectivabyUser(id: any) {
    return await this.directivaRepository.findOne({
      where: {
        id,
      },
    });
  }
  async deletedirectiva(id: number) {
    const result = await this.directivaRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async updateUser(id: number, directiva: createDirectivaDto) {
    const directivaFound = await this.directivaRepository.findOne({
      where: {
        id,
      },
    });
    if (!directivaFound) {
      return new HttpException('Direciva not found', HttpStatus.NOT_FOUND);
    }
    const updateDirectiva = Object.assign(directivaFound, directiva);
    return this.directivaRepository.save(updateDirectiva);
  }
  async crearUsuarioDirectiva(
    idUsuario: number,
    directiva: createDirectivaDto,
  ) {
    const nuevaDirectiva = this.directivaRepository.create(directiva);
    this.directivaRepository.save(nuevaDirectiva);
    const result = await this.directivaRepository.query(
      'update usuarios set usuarios.directivaId=' +
        '(Select id from directiva order by id desc limit 1),' +
        " usuarios.esDirectiva='Si' where usuarios.id=" +
        idUsuario +
        ';',
    );
    return result;
  }
}
