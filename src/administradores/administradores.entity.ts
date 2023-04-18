/* eslint-disable prettier/prettier */
import { Persona } from 'src/persona/persona.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    BeforeInsert,
    Unique,
    Repository,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  @Entity({ name: 'administradores' })
  export class Administrador {
      @PrimaryGeneratedColumn()
      id: number;
      @Column()
      username: string;
      @Column()
      password: string;
      @Column()
      token: string;
      @Column({type:'uuid', unique: true, name:'reset_password-token',nullable:true})
      resetPasswordToken: string;
      @Column({ type: 'datetime', default: () =>  'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ nullable: true })
  authStrategy: string;
  @Column()
    role: string;
  @BeforeInsert()
  async hashPassword(){
     this.password = await bcrypt.hash(this.password,8);
  }
  async validatePassword(password: string): Promise<boolean>{
    return bcrypt.compare(password, this.password);
  }
      @OneToOne(() => Persona )
      @JoinColumn()
      persona: Persona;
  }
  