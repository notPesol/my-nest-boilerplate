import { Injectable } from '@nestjs/common';
import { PostRepository } from './repository';
import { PostDTO } from './dto/dto';
import { PostSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { CreatePostDTO } from './dto/create-post.dto';
import { BaseService } from 'src/common/service/base.service';
import { ResponseDTO } from 'src/common/dto/response.dto';

@Injectable()
export class PostService extends BaseService<PostDTO> {
  constructor(private readonly postRepository: PostRepository) {
    super(postRepository);
  }

  async findAll(searchDTO: PostSearchDTO): Promise<ResponseDTO<PostDTO[]>> {
    const where = {};
    const options = {};

    if (searchDTO.query) {
      where['title'] = {
        [Op.iLike]: `%${searchDTO.query}%`,
      };
    }
    if (!searchDTO.ignorePage) {
      options['limit'] = searchDTO.limit;
      options['offset'] = (searchDTO.page - 1) * searchDTO.limit;
    }

    const responseDTO = new ResponseDTO<PostDTO[]>();

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

  async createNew(dto: CreatePostDTO, req: any) {
    const model = await this.postRepository.create({
      ...dto,
      userId: req?.user?.id,
    });
    return new PostDTO(model);
  }
}
