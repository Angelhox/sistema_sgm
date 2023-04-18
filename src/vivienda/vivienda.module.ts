import { Module } from '@nestjs/common';
import { ViviendaService } from './vivienda.service';
import { ViviendaController } from './vivienda.controller';
import { Vivienda } from './vivienda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vivienda])],
  controllers: [ViviendaController],
  providers: [ViviendaService],
  exports: [ViviendaModule, ViviendaService],
})
export class ViviendaModule {}
