import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { UserDTO } from './dto/dto';
import { UserSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { BaseService } from 'src/common/service/base.service';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class UserService extends BaseService<UserDTO> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async findAll(searchDTO: UserSearchDTO): Promise<ResponseDTO<UserDTO[]>> {
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

    const responseDTO = new ResponseDTO<UserDTO[]>();

    const findOptions = {
      where,
      attributes: { exclude: ['password'] },
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
