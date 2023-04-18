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
  @Entity({ name: 'familiares' })
  export class Familiares {
      @PrimaryGeneratedColumn()
      id: number;
      @Column()
      jefeHogar: string;
      @Column()
      numeroHijos: string;
      @Column()
      numeroMiembros: string;
      @OneToMany(() => Usuarios, usuario => usuario.familiares)
      usuarios: Usuarios[];

  }
  