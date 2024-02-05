import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { UserDTO } from './dto/dto';
import { UserSearchDTO } from './dto/search.dto';
import { Roles } from 'src/common/decorator/roles';
import { Role } from 'src/common/enum';
import { BaseController } from 'src/common/controller/base.controller';

@Controller('/user')
export class UserController extends BaseController<UserDTO> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async findAll(@Query() searchDTO: UserSearchDTO) {
    const result = await this.service.findAll(searchDTO);
    return result;
  }

  @Roles(Role.Admin)
  @Get('/:id')
  async findByPk(@Param('id') id: number) {
    const result = await this.userService.findByPk(id);
    delete result.password;
    const responseDTO = new ResponseDTO<UserDTO>();
    responseDTO.data = result;
    return responseDTO;
  }
}
