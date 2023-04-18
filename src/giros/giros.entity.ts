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
  @Entity({ name: 'giros' })
  export class Giros {
      @PrimaryGeneratedColumn()
      id: number;
      @Column()
      giro: string;
      @Column()
      horarioAbierto: string;
      @Column()
      horarioCerrado: string;
      @Column()
      lugarAutorizado: string;
      @Column()
      diasHorario: string;
      @Column()
      direccionLugarAutorizado: string;
      @OneToMany(()=> Usuarios, usuario => usuario.giros)
      usuarios: Usuarios[];

  }

  