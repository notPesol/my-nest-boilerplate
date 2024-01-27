import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from './dto/dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RoleDTO } from 'src/role/dto/dto';
import {
  UserAssociationRepository,
  includeKey,
} from 'src/user-association/repository';
import { UserAssociationDTO } from 'src/user-association/dto/dto';
import { Role } from 'src/common/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAssociationRepository: UserAssociationRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async findOne(username: string) {
    const model = await this.userAssociationRepository.findOne({
      include: this.userAssociationRepository.getIncludeOption(
        includeKey.userRole,
      ),
      where: {
        username,
      },
    });

    return new UserAssociationDTO(model);
  }

  private async createAccessToken(userAssociationDTO: UserAssociationDTO) {
    const payload = {
      sub: userAssociationDTO.id,
      id: userAssociationDTO.id,
      username: userAssociationDTO.username,
      roles: userAssociationDTO.roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
    };

    return await this.jwtService.signAsync(payload);
  }

  async login(body: LoginDTO) {
    const userAssociationDTO = await this.findOne(body.username);

    const isTrue = await bcrypt.compare(
      body.password,
      userAssociationDTO.password,
    );

    if (!userAssociationDTO?.id || !isTrue) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.createAccessToken(userAssociationDTO);
    return { accessToken };
  }

  async register(body: LoginDTO) {
    const model = await this.userAssociationRepository.findOne({
      where: { username: body.username },
    });

    if (model) {
      throw new BadRequestException('Username is already exist.');
    }

    const saltOrRounds = 10;
    const password = body.password;
    body.password = await bcrypt.hash(password, saltOrRounds);

    const newUserModel = await this.userAssociationRepository.create(
      { ...body },
      { returning: true },
    );
    const userDTO = new UserDTO(newUserModel);

    const roleModel = await this.userAssociationRepository
      .getRoleRepository()
      .findOne({
        where: { name: Role.User },
      });

    const roleDTO = new RoleDTO(roleModel);

    await this.userAssociationRepository.getUserRoleRepository().create({
      userId: userDTO.id,
      roleId: roleDTO.id,
    });

    const userAssociationDTO = await this.findOne(body.username);

    const accessToken = await this.createAccessToken(userAssociationDTO);
    return { accessToken };
  }
}
