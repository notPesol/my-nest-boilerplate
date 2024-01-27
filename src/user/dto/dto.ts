import { BaseDTO } from "src/common/dto/base.dto";

export class UserDTO extends BaseDTO {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
