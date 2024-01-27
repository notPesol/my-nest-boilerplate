import { BaseDTO } from 'src/common/dto/base.dto';

export class PostDTO extends BaseDTO {
  id: number;
  userId: number;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
