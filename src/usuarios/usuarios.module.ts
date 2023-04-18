import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuarios } from './usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from 'src/persona/persona.module';
import { PersonaService } from 'src/persona/persona.service';
import { FamiliaresModule } from 'src/familiares/familiares.module';
import { GirosModule } from 'src/giros/giros.module';
import { ViviendaModule } from 'src/vivienda/vivienda.module';
import { AsociacionesModule } from 'src/asociaciones/asociaciones.module';
import { DirectivaModule } from 'src/directiva/directiva.module';
import { Persona } from 'src/persona/persona.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
    PersonaModule,
    FamiliaresModule,
    GirosModule,
    DirectivaModule,
    ViviendaModule,
    AsociacionesModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
