import { Injectable } from '@nestjs/common';
import { DataTypes } from 'sequelize';
import { BaseRepoSitory } from 'src/common/repository/base.repositoty';
import { SequelizeService } from 'src/common/sequelize/service';
import { RoleRepository } from 'src/role/repository';
import { UserRepository } from 'src/user/repository';

@Injectable()
export class UserRoleRepository extends BaseRepoSitory {
  constructor(
    private readonly databaseService: SequelizeService,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.databaseService.defineModel(
      'userRole',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: this.userRepository.getModel(),
            key: 'id',
          },
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: this.roleRepository.getModel(),
            key: 'id',
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: () => new Date(),
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: () => new Date(),
        },
      },
      { tableName: 'user_role' },
    );
  }
}
