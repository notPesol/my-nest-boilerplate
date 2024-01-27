import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { UserDTO } from './dto/dto';
import { UserSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { BaseService } from 'src/common/service/base.service';

@Injectable()
export class UserService extends BaseService<UserDTO> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async findAll(
    searchDTO: UserSearchDTO,
  ): Promise<{ rows: UserDTO[]; count: number }> {
    const where = {};
    const options = {};

    if (searchDTO.query) {
      where['username'] = {
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

    const models = await this.userRepository.findAll({
      where,
      attributes: { exclude: ['password'] },
      ...options,
    });

    const rows = models.map((e) => new UserDTO(e));

    return { count: 0, rows };
  }
}
