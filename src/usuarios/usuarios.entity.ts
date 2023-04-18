/* eslint-disable prettier/prettier */
import { type } from 'os';
import { Administrador } from 'src/administradores/administradores.entity';
import { Asociaciones } from 'src/asociaciones/asociaciones.entity';
import { Directiva } from 'src/directiva/directiva.entity';
import { Familiares } from 'src/familiares/familiares.entity';
import { Giros } from 'src/giros/giros.entity';
import { Persona } from 'src/persona/persona.entity';
import { Vivienda } from 'src/vivienda/vivienda.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
@Entity({ name: 'usuarios' })
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  carnetizado: string;
  @Column()
  categoria:string;
  @Column()
  registrado: string;
  @Column()
  estado: string;
  @Column()
  discapacidad:string;
  @Column()
  idCarnetDiscapacidad:string;
  @Column()
  idCarnet:string;
  @Column()
  tipoDiscapacidad:string;
  @Column()
  gradoDiscapacidad:string;
  @Column()
  esDirectiva:string;
  @Column()
  estadoCivil:string;
  @Column()
  fechaRegistro: Date;
  @Column()
  fechaNacimiento: Date;
  @ManyToOne(() => Persona, persona=> persona.usuarios )
  persona: Persona;
  @ManyToOne(() => Vivienda, vivienda=> vivienda.usuarios)
  vivienda: Vivienda;
  @ManyToOne(() => Familiares, familiares=> familiares.usuarios)
  familiares: Familiares;
  @ManyToOne(() => Giros, giros=> giros.usuarios)
  giros: Giros;
  @ManyToOne(() => Directiva, directiva=> directiva.usuarios)
  directiva: Directiva;
  @ManyToOne(() => Asociaciones, asociaciones=> asociaciones.usuarios )
 asociacion: Asociaciones;
}
