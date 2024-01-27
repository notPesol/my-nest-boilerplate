import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { PostDTO } from './dto/dto';
import { PostSearchDTO } from './dto/search.dto';
import { CreatePostDTO } from './dto/create-post.dto';
import { Roles } from 'src/common/decorator/roles';
import { Role } from 'src/common/enum';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(Role.User)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  create(@Body() dto: CreatePostDTO, @Req() req) {
    return this.postService.create(dto, req).then((result) => {
      const responseDTO = new ResponseDTO<PostDTO>();
      responseDTO.data = result;
      return responseDTO;
    });
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findAll(@Query() searchDTO: PostSearchDTO) {
    return this.postService.findAll(searchDTO).then((result) => {
      const responseDTO = new ResponseDTO<PostDTO[]>();
      responseDTO.data = result;
      return responseDTO;
    });
  }
}
