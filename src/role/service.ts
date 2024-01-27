import { Injectable } from '@nestjs/common';
import { RoleRepository } from './repository';
import { RoleDTO } from './dto/dto';
import { RoleSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findAll(searchDTO: RoleSearchDTO): Promise<RoleDTO[]> {
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

    const models = await this.roleRepository.findAll({ where, ...options });

    return models.map((e) => new RoleDTO(e));
  }
}
