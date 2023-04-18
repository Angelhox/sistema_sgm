import { Controller } from '@nestjs/common';
import { GirosService } from './giros.service';

@Controller('giros')
export class GirosController {
  constructor(private readonly girosService: GirosService) {}
}
