/* eslint-disable prettier/prettier */
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
import { Usuarios } from 'src/usuarios/usuarios.entity';
@Entity({ name: 'persona' })
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    apellido: string;
    @Column( {unique : true, length:15} )
    cedula: string;
    @Column()
    telefono: string;
    @Column()
    correo: string;
    @Column()
    direccion: string;
    @OneToMany(() => Usuarios, usuario => usuario.persona)
    usuarios: Usuarios[];
}
