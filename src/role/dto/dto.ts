import { BaseDTO } from 'src/common/dto/base.dto';

export class RoleDTO extends BaseDTO {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
