import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Asociaciones } from './asociaciones.entity';
import { createAsocDto } from './asociaciones.dto';
import { BaseService } from 'src/commons/service.commons';

@Injectable()
export class AsociacionesService extends BaseService<Asociaciones> {
  getRepository(): Repository<Asociaciones> {
    return this.asociacionesRepository;
  }
  constructor(
    @InjectRepository(Asociaciones)
    private asociacionesRepository: Repository<Asociaciones>,
  ) {
    super();
  }
  async createAsociacion(asociaciones: createAsocDto) {
    const newData = this.asociacionesRepository.create(asociaciones);
    await this.asociacionesRepository.save(newData);
    return newData;
  }
  async getAsociaciones(id: number) {
    return await this.asociacionesRepository.findOne({
      where: {
        id,
      },
    });
  }
  async deletAsociaciones(id: number) {
    const result = await this.asociacionesRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Asocianot found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  //Usando Orm
  async updateAsociaciones(id: number, asociaciones: createAsocDto) {
    const dataFound = await this.asociacionesRepository.findOne({
      where: {
        id,
      },
    });
    if (!dataFound) {
      return new HttpException('Asociacion not found', HttpStatus.NOT_FOUND);
    }
    const updateData = Object.assign(dataFound, asociaciones);
    return this.asociacionesRepository.save(updateData);
  }
  //Usando SqlQuerys
  async updateDataAsociaciones(id: number, asociaciones: createAsocDto) {
    return this.getRepository().query(
      "update asociaciones set nombre= '" +
        asociaciones.nombre +
        "',ruc=' " +
        asociaciones.ruc +
        "',lugarAutorizado='" +
        asociaciones.lugarAutorizado +
        "',direccionLugarAutorizado='" +
        asociaciones.direccionLugarAutorizado +
        "',correo='" +
        asociaciones.correo +
        "',legalizada='" +
        asociaciones.legalizada +
        "',documentoLegalizacion='" +
        asociaciones.documentoLegalizacion +
        "',fechaCreacion='" +
        asociaciones.fechaCreacion +
        "',tipoContribuyente='" +
        asociaciones.tipoContribuyente +
        "',cede='" +
        asociaciones.cede +
        "',direccionCede='" +
        asociaciones.direccionCede +
        "',telefono='" +
        asociaciones.telefono +
        "' where asociaciones.id=" +
        id +
        ';',
    );
  }
}
