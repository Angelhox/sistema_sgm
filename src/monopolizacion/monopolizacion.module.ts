import { Module } from '@nestjs/common';
import { MonopolizacionService } from './monopolizacion.service';
import { MonopolizacionController } from './monopolizacion.controller';
import { Monopolizacion } from './monopolizacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //imports: [TypeOrmModule.forFeature([Monopolizacion])],
  controllers: [MonopolizacionController],
  providers: [MonopolizacionService],
})
export class MonopolizacionModule {}
