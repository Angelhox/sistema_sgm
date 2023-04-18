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
  } from 'typeorm';
  @Entity({ name: 'vivienda' })
  export class Vivienda {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    propiedadVivienda: string;
    @Column()
    aguaPotable:string;
    @Column()
    luzElectrica: string;
    @Column()
    servicioTelefono: string;
    @Column()
    servicioInternet:string;
    @Column()
    numeroDormitorios:string;
    @OneToMany(() => Usuarios, usuario => usuario.vivienda)
    usuarios: Usuarios[];
  }
  