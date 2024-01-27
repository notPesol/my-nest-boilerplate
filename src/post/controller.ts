import {
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { PostDTO } from './dto/dto';
import { Roles } from 'src/common/decorator/roles';
import { Role } from 'src/common/enum';
import { BaseController } from 'src/common/controller/base.controller';
import { Request } from 'express';

@Controller('/post')
export class PostController extends BaseController<PostDTO> {
  constructor(private readonly postService: PostService) {
    super(postService);
  }

  @Roles(Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createNew(
    @Body() body: any,
    @Req() req: Request,
  ): Promise<ResponseDTO<PostDTO>> {
    const result = await this.postService.createNew(body, req);
    const responseDTO = new ResponseDTO<PostDTO>();
    responseDTO.data = result;
    return responseDTO;
  }
}
