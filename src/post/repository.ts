import { Injectable } from '@nestjs/common';
import { DataTypes } from 'sequelize';
import { BaseRepoSitory } from 'src/common/repository/base.repositoty';
import { SequelizeService } from 'src/common/sequelize/service';
import { UserRepository } from 'src/user/repository';

@Injectable()
export class PostRepository extends BaseRepoSitory {
  constructor(
    private readonly databaseService: SequelizeService,
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.databaseService.defineModel(
      'post',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: this.userRepository.getModel(),
            key: 'id',
          },
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        text: {
          type: DataTypes.STRING,
          allowNull: false,
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
      { tableName: 'posts' },
    );
  }
}
