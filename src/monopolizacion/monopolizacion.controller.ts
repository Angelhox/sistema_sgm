import { Controller } from '@nestjs/common';
import { MonopolizacionService } from './monopolizacion.service';

@Controller('monopolizacion')
export class MonopolizacionController {
  constructor(private readonly monopolizacionService: MonopolizacionService) {}
}
