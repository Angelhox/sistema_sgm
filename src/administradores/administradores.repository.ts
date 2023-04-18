/* eslint-disable prettier/prettier */
import { Administrador } from './administradores.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Administrador)
export class adminRepository extends Repository<Administrador> {}
