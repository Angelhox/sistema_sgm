import { Controller } from '@nestjs/common';
import { FamiliaresService } from './familiares.service';

@Controller('familiares')
export class FamiliaresController {
  constructor(private readonly familiaresService: FamiliaresService) {}
}
