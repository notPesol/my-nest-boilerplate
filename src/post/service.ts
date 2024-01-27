import { Injectable } from '@nestjs/common';
import { PostRepository } from './repository';
import { PostDTO } from './dto/dto';
import { PostSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll(searchDTO: PostSearchDTO): Promise<PostDTO[]> {
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

    const models = await this.postRepository
      .getModel()
      .findAll({ where, ...options });

    return models.map((e) => new PostDTO(e));
  }

  async create(dto: CreatePostDTO, req: any) {
    const model = await this.postRepository
      .getModel()
      .create({ ...dto, userId: req?.user?.id });

    return new PostDTO(model);
  }
}
