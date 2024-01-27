import { RoleDTO } from "src/role/dto/dto"
import { UserDTO } from "src/user/dto/dto"

export class UserAssociationDTO extends UserDTO {
  roles: RoleDTO[]
}