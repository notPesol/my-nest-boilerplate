import { Injectable } from '@nestjs/common';
import { RoleRepository } from './repository';
import { RoleDTO } from './dto/dto';
import { RoleSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { BaseService } from 'src/common/service/base.service';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class RoleService extends BaseService<RoleDTO> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }

  async findAll(searchDTO: RoleSearchDTO): Promise<ResponseDTO<RoleDTO[]>> {
    const where = {};
    const options = {};

    if (searchDTO.query) {
      where['name'] = {
        [Op.iLike]: `%${searchDTO.query}%`,
      };
    }
    if (!searchDTO.ignorePage) {
      options['limit'] = searchDTO.limit;
      options['offset'] = (searchDTO.page - 1) * searchDTO.limit;
    }

    const responseDTO = new ResponseDTO<RoleDTO[]>();

    const findOptions = {
      where,
      ...options,
    };

    if (searchDTO.count) {
      const { rows, count } = await this.findAndCountAll(findOptions);
      responseDTO.data = rows;
      responseDTO.totalItem = count;
    } else {
      const rows = await this.getAll(findOptions);
      responseDTO.data = rows;
    }

    return responseDTO;
  }
}
