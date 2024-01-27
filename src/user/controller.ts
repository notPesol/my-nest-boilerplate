import {
  Controller,
  Get,
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

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findAll(@Query() searchDTO: UserSearchDTO) {
    return this.userService.findAll(searchDTO).then((result) => {
      const responseDTO = new ResponseDTO<UserDTO[]>();
      responseDTO.data = result;
      return responseDTO;
    });
  }
}
