import { Controller } from '@nestjs/common';
import { RoleService } from './service';
import { RoleDTO } from './dto/dto';
import { BaseController } from 'src/common/controller/base.controller';

@Controller('/role')
export class RoleController extends BaseController<RoleDTO> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
