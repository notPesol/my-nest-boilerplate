import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RoleDTO } from './dto/dto';
import { RoleSearchDTO } from './dto/search.dto';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findAll(@Query() searchDTO: RoleSearchDTO) {
    return this.roleService.findAll(searchDTO).then((result) => {
      const responseDTO = new ResponseDTO<RoleDTO[]>();
      responseDTO.data = result;
      return responseDTO;
    });
  }
}
