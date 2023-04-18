/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { connection } from 'mongoose';
import { FindManyOptions,Repository,QueryBuilder, } from 'typeorm';


export abstract class BaseService<T> {
  abstract getRepository(): Repository<T>;
  findAll() : Promise<T[]>{
    return this.getRepository().find();
  }
  findOne(id:any): Promise<T>{
    return this.getRepository().findOne( id );
  }
  save(entity:T): Promise<T>{
    return this.getRepository().save(entity);
  }
  saveMany(entities: T[]): Promise<T[]>{
    return this.getRepository().save(entities);
  }
  async delete(id:any){
    await this.getRepository().delete(id);
  }
  count(options?: FindManyOptions<T>):Promise<number>{
    return this.getRepository().count(options);
  }
  async getProductById(id: number): Promise<T> {
    const result = await this.getRepository().query(
      'call getProductById(?)',
      [id],
    );
    return result[0];
  }
  async insertUsuarios(nombre:any,apellido:any,telefono:any,correo:any,direccion:any,
    cedula:any,jefeHogar:any,numeroHijos:any,numeroMiembros:any,propiedadVivienda:any,
    aguaPotable:any,luzElectrica:any,servicioTelefono:any,
    servicioInternet:any,numeroDormitorios:any,diasHorario:any,
    direccionLugarAutorizado:any,giro:any,
    horarioAbierto:any,horarioCerrado:any,lugarAutorizado:any,
    carnetizado:any,categoria:any,registrado:any,estado:any,
    discapacidad:any,idCarnetDiscapacidad:any,idCarnet:any,tipoDiscapacidad:any,
    gradoDiscapacidad:any,estadoCivil:any,fechaRegistro:any,fechaNacimiento:any,
    esDirectiva:any
    ):Promise<void>{
    const result = await this.getRepository().query(
      'call insertUsuarios(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [nombre,apellido,telefono,correo,direccion,cedula,jefeHogar,numeroHijos,
      numeroMiembros,propiedadVivienda,aguaPotable,
      luzElectrica,servicioTelefono,servicioInternet,
      numeroDormitorios,diasHorario,direccionLugarAutorizado,giro,horarioAbierto,horarioCerrado,
      lugarAutorizado,carnetizado,categoria,registrado,
      estado,discapacidad,idCarnetDiscapacidad,idCarnet,tipoDiscapacidad,
      gradoDiscapacidad,estadoCivil,fechaRegistro,fechaNacimiento,esDirectiva],
    );
    return result[0];
  }
  async updateData(id:any, entity:T):Promise<T> {
    const dataFound = this.getRepository().findOne(id);
    if(!dataFound) {
      console.log('error updating');
    }
    const updateData= Object.assign(entity,dataFound);
    return this.getRepository().save(updateData); 
    }
  
  async selectUsersData(){
    const result= await this.getRepository().query(
    'select '+
    'persona.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,'+
    'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,'+
    'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,'+
    'vivienda.numeroDormitorios,'+
    'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,'+
    'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,'+
    'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,'+
    'usuarios.asociacionId from persona join usuarios on persona.id=usuarios.personaId join familiares on'+
    ' familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId;'
    );
    return result;

  }
 
  
  async listarUsuariosPorAsociacion(idAsoc:number){
    this.getRepository().query('select '+
    'persona.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,'+
    'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,'+
    'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,'+
    'vivienda.numeroDormitorios,'+
    'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,'+
    'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,'+
    'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,'+
    'usuarios.asociacionId from persona join usuarios on persona.id=usuarios.personaId join familiares on '+
    'familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId where usuarios.asociacionId='+idAsoc+' ;')
  }  async listarUsuarioPorAsociacion(idAsoc:number){
    this.getRepository().query('select '+
    'persona.id,persona.nombre,persona.apellido,persona.cedula, persona.telefono,persona.correo,persona.direccion,'+
    'familiares.jefeHogar,familiares.numeroHijos,familiares.numeroMiembros,'+
    'vivienda.propiedadVivienda,vivienda.aguaPotable,vivienda.luzElectrica,vivienda.servicioTelefono,vivienda.servicioInternet,'+
    'vivienda.numeroDormitorios,'+
    'usuarios.carnetizado,usuarios.categoria,usuarios.registrado,usuarios.estado,usuarios.discapacidad,usuarios.idCarnetDiscapacidad,'+
    'usuarios.idCarnet,usuarios.tipoDiscapacidad,usuarios.gradoDiscapacidad,usuarios.esDirectiva,usuarios.estadoCivil,usuarios.fechaRegistro,'+
    'usuarios.fechaNacimiento,usuarios.personaId,usuarios.viviendaId,usuarios.familiaresId,usuarios.girosId,usuarios.directivaId,'+
    'usuarios.asociacionId from persona join usuarios on persona.id=usuarios.personaId join familiares on '+
    'familiares.id=usuarios.familiaresId join vivienda on vivienda.id=usuarios.viviendaId where usuarios.asociacionId='+idAsoc+' ;')
  }
  

}

