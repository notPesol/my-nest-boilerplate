import { Injectable } from '@nestjs/common';
import { PostRepository } from './repository';
import { PostDTO } from './dto/dto';
import { PostSearchDTO } from './dto/search.dto';
import { Op } from 'sequelize';
import { CreatePostDTO } from './dto/create-post.dto';
import { BaseService } from 'src/common/service/base.service';

@Injectable()
export class PostService extends BaseService<PostDTO> {
  constructor(private readonly postRepository: PostRepository) {
    super(postRepository);
  }

  async findAll(searchDTO: PostSearchDTO): Promise<{
    rows: PostDTO[];
    count: number;
  }> {
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

    if (searchDTO.count) {
      return this.findAndCountAll({ where, ...options });
    }

    const models = await this.postRepository.findAll({ where, ...options });

    const rows = models.map((e) => new PostDTO(e));

    return { count: 0, rows };
  }

  async createNew(dto: CreatePostDTO, req: any) {
    const model = await this.postRepository.create({
      ...dto,
      userId: req?.user?.id,
    });
    return new PostDTO(model);
  }
}
