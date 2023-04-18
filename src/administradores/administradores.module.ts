import { Module } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { AdministradoresController } from './administradores.controller';
import { Administrador } from './administradores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from 'src/persona/persona.module';
import { PersonaService } from 'src/persona/persona.service';
import { adminRepository } from './administradores.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([Administrador, adminRepository]),
    PersonaModule,
  ],
  controllers: [AdministradoresController],
  providers: [AdministradoresService],
  exports: [AdministradoresService, AdministradoresModule],
})
export class AdministradoresModule {}
