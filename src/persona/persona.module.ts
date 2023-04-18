import { Module } from '@nestjs/common';
import { personaController } from './persona.controller';
import { Persona } from './persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaService } from './persona.service';
@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  controllers: [personaController],
  providers: [PersonaService],
  exports: [PersonaModule, PersonaService],
})
export class PersonaModule {}
