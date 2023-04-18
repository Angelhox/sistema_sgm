import { Module } from '@nestjs/common';
import { DirectivaService } from './directiva.service';
import { DirectivaController } from './directiva.controller';
import { Directiva } from './directiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Directiva])],
  controllers: [DirectivaController],
  providers: [DirectivaService],
  exports: [DirectivaService, DirectivaModule],
})
export class DirectivaModule {}
