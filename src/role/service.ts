import { Injectable } from '@nestjs/common';
import { RoleRepository } from './repository';
import { RoleDTO } from './dto/dto';
import { RoleSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { BaseService } from 'src/common/service/base.service';

@Injectable()
export class RoleService extends BaseService<RoleDTO> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }

  async findAll(
    searchDTO: RoleSearchDTO,
  ): Promise<{ rows: RoleDTO[]; count: number }> {
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

    if (searchDTO.count) {
      return this.findAndCountAll({ where, ...options });
    }

    const models = await this.roleRepository.findAll({ where, ...options });

    const rows = models.map((e) => new RoleDTO(e));

    return { count: 0, rows };
  }
}
