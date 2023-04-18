import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonaModule } from './persona/persona.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ViviendaModule } from './vivienda/vivienda.module';
import { FamiliaresModule } from './familiares/familiares.module';
import { DirectivaModule } from './directiva/directiva.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { AsociacionesModule } from './asociaciones/asociaciones.module';
import { GirosModule } from './giros/giros.module';
import { MonopolizacionModule } from './monopolizacion/monopolizacion.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'root',
      host: 'localhost',
      port: 3309,
      database: 'bdsistema_sgm',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PersonaModule,
    UsuariosModule,
    ViviendaModule,
    FamiliaresModule,
    DirectivaModule,
    AdministradoresModule,
    AsociacionesModule,
    AuthModule,
    GirosModule,
    MonopolizacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
