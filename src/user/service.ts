import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { UserDTO } from './dto/dto';
import { UserSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(searchDTO: UserSearchDTO): Promise<UserDTO[]> {
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

    const models = await this.userRepository.findAll({
      where,
      attributes: { exclude: ['password'] },
      ...options,
    });

    return models.map((e) => new UserDTO(e));
  }
}
