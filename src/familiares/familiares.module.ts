import { Module } from '@nestjs/common';
import { FamiliaresService } from './familiares.service';
import { FamiliaresController } from './familiares.controller';
import { Familiares } from './familiares.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Familiares])],
  controllers: [FamiliaresController],
  providers: [FamiliaresService],
  exports: [FamiliaresModule, FamiliaresService],
})
export class FamiliaresModule {}
