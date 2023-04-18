/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { BaseService } from './service.commons';

export abstract class BaseController<T> {
  abstract getService(): BaseService<T>;

  @Get('all')
  async findAll(): Promise<T[]> {
    return await this.getService().findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id): Promise<T> {
    return await this.getService().findOne({where: {id:id}});
  }

  @Post('save')
  @HttpCode(HttpStatus.CREATED)
  async save(@Body() entity: T): Promise<T> {
    return await this.getService().save(entity);
  }

  @Post('save/many')
  @HttpCode(HttpStatus.CREATED)
  async saveMany(@Body() entities: T[]): Promise<T[]> {
    return await this.getService().saveMany(entities);
  }
  @Post('update/:id')
  @HttpCode(HttpStatus.CREATED)
  async upate(@Param('id')id,@Body() entity: T):Promise<T>{
  return await this.getService().updateData({where: {id:id}},entity);
  }
  
  @Post('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: any) {
    return this.getService().delete(id);
  }

  @Get('count')
  async count(): Promise<number> {
    return await this.getService().count();
  }
  @Get('query/:id')
  async getProductById(@Param('id') id): Promise<T> {
    return await this.getService().getProductById(id);
  }
  @Post('query')
  @HttpCode(HttpStatus.CREATED)
  async insertUsuarios(@Body() body:{nombre:any,apellido:any,telefono:any,correo:any,direccion:any,
    cedula:any,jefeHogar:any,numeroHijos:any,numeroMiembros:any,propiedadVivienda:any,
    aguaPotable:any,luzElectrica:any,servicioTelefono:any,
    servicioInternet:any,numeroDormitorios:any,diasHorario:any,
    direccionLugarAutorizado:any,giro:any,
    horarioAbierto:any,horarioCerrado:any,lugarAutorizado:any,
    carnetizado:any,categoria:any,registrado:any,estado:any,
    discapacidad:any,idCarnetDiscapacidad:any,idCarnet:any,tipoDiscapacidad:any,
    gradoDiscapacidad:any,estadoCivil:any,fechaRegistro:any,fechaNacimiento:any,
    esDirectiva:any}){
  await this.getService().insertUsuarios(body.nombre,body.apellido,body.telefono,body.correo,body.direccion,body.cedula,body.jefeHogar,body.numeroHijos,
    body.numeroMiembros,body.propiedadVivienda,body.aguaPotable,
    body.luzElectrica,body.servicioTelefono,body.servicioInternet,body.numeroDormitorios,
    body.diasHorario,body.direccionLugarAutorizado,body.giro,body.horarioAbierto,body.horarioCerrado,body.lugarAutorizado,
    body.carnetizado,body.categoria,body.registrado,
    body.estado,body.discapacidad,body.idCarnetDiscapacidad,body.idCarnet,body.tipoDiscapacidad,body.gradoDiscapacidad,body.estadoCivil,body.fechaRegistro,
    body.fechaNacimiento,body.esDirectiva);
    return{message:'Los datos se ingresaron correctamente'}
  }
  @Get('selectUsers')
  async selectUsers(){
    return await this.getService().selectUsersData();
  }
}