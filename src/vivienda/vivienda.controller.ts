import { Controller } from '@nestjs/common';
import { ViviendaService } from './vivienda.service';

@Controller('vivienda')
export class ViviendaController {
  constructor(private readonly viviendaService: ViviendaService) {}
}
