/* eslint-disable prettier/prettier */
import { Asociaciones } from 'src/asociaciones/asociaciones.entity';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
    BeforeInsert,
    Unique,
  } from 'typeorm';
  @Entity({ name: 'monopolizacion' })
  export class Monopolizacion {
      @PrimaryGeneratedColumn()
      id: number;
     @ManyToOne(() => Asociaciones)
     asociacion: Asociaciones;
     @ManyToOne(() => Usuarios)
     usuario: Usuarios;
  }
  