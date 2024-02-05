import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseService } from '../service/base.service';
import { ResponseDTO } from '../dto/response.dto';
import { SearchDTO } from '../dto/search.dto';

export class BaseController<T> {
  protected readonly service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  @Get('/:id')
  async findByPk(@Param('id') id: number): Promise<ResponseDTO<T>> {
    const result = await this.service.findByPk(id);
    const responseDTO = new ResponseDTO<T>();
    responseDTO.data = result;
    return responseDTO;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async findAll(@Query() searchDTO: SearchDTO): Promise<ResponseDTO<T[]>> {
    const result = await this.service.findAll(searchDTO);
    return result;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create(@Body() body: any): Promise<ResponseDTO<T>> {
    const result = await this.service.create(body);
    const responseDTO = new ResponseDTO<T>();
    responseDTO.data = result;
    return responseDTO;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Put()
  async update(@Body() body: any): Promise<ResponseDTO<T>> {
    const result = await this.service.update(body.id, body);
    const responseDTO = new ResponseDTO<T>();
    responseDTO.data = result;
    return responseDTO;
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<ResponseDTO<boolean>> {
    const result = await this.service.delete(id);
    const responseDTO = new ResponseDTO<boolean>();
    responseDTO.data = result;
    return responseDTO;
  }
}
