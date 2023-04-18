/* eslint-disable prettier/prettier */
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
  @Entity({ name: 'directiva' })
  export class Directiva {
      @PrimaryGeneratedColumn()
      id: number;
      @Column()
      cargo: string;
      @Column()
      fechaInicio: Date;
      @Column()
      fechaFin: Date;
      @OneToMany(() => Usuarios, usuario => usuario.directiva)
      usuarios: Usuarios[];
  }
  