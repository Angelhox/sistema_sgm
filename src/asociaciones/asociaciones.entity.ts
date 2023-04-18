/* eslint-disable prettier/prettier */
import { type } from 'os';
import { Usuarios } from 'src/usuarios/usuarios.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    BeforeInsert,
    Unique,
  } from 'typeorm';
  @Entity({ name: 'asociaciones' })
  export class Asociaciones {
      @PrimaryGeneratedColumn()
      id: number;
      @Column()
      nombre: string;
      @Column()
      ruc: string;
      @Column()
      lugarAutorizado: string;
      @Column()
      direccionLugarAutorizado: string;
      @Column()
      cede: string;
      @Column()
      direccionCede: string;
      @Column()
      telefono: string;
      @Column()
      correo: string;
      @Column()
      legalizada: string;
      @Column()
      documentoLegalizacion: string;
      @Column({type:'date'})
      fechaCreacion: Date;
      @Column()
      tipoContribuyente: string;
      @OneToMany(() => Usuarios, usuario => usuario.asociacion )
      usuarios:Usuarios[];
  }
  
  