import { Module } from '@nestjs/common';
import { AsociacionesService } from './asociaciones.service';
import { AsociacionesController } from './asociaciones.controller';
import { Asociaciones } from './asociaciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Asociaciones])],
  controllers: [AsociacionesController],
  providers: [AsociacionesService],
  exports: [AsociacionesModule, AsociacionesService],
})
export class AsociacionesModule {}
