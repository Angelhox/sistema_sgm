import { Body, Controller, Param, Post } from '@nestjs/common';
import { BaseController } from 'src/commons/controller.commons';
import { BaseService } from 'src/commons/service.commons';
import { createAsocDto } from './asociaciones.dto';
import { Asociaciones } from './asociaciones.entity';
import { AsociacionesService } from './asociaciones.service';

@Controller('asociaciones')
export class AsociacionesController extends BaseController<Asociaciones> {
  getService(): BaseService<Asociaciones> {
    return this.asociacionesService;
  }
  constructor(private readonly asociacionesService: AsociacionesService) {
    super();
  }
  @Post()
  createAsociacion(@Body() asociacion: createAsocDto) {
    this.asociacionesService.createAsociacion(asociacion);
  }
  @Post('/actualizar/:id')
  upateDataAsociaciones(
    @Param('id') id: number,
    @Body() asociacion: createAsocDto,
  ) {
    this.asociacionesService.updateDataAsociaciones(id, asociacion);
  }
}
