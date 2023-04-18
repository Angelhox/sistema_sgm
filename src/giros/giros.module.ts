import { Module } from '@nestjs/common';
import { GirosService } from './giros.service';
import { GirosController } from './giros.controller';
import { Giros } from './giros.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Giros])],
  controllers: [GirosController],
  providers: [GirosService],
  exports: [GirosModule, GirosService],
})
export class GirosModule {}
