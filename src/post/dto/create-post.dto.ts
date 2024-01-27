import { IsOptional, IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  title: string;

  @IsString()
  text: string;
}
