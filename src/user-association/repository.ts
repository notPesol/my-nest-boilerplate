import { Injectable } from '@nestjs/common';
import { BaseAssociationRepository } from 'src/common/repository/base-association.repository';
import { PostRepository } from 'src/post/repository';
import { RoleRepository } from 'src/role/repository';
import { UserRoleRepository } from 'src/user-role/repository';
import { UserRepository } from 'src/user/repository';

export enum includeKey {
  userRole = 'user-role',
  userPost = 'user-post',
  userRolePost = 'user-role-post',
}

@Injectable()
export class UserAssociationRepository extends BaseAssociationRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly postRepository: PostRepository,
  ) {
    super();
  }

  protected init(): void {
    this.model = this.userRepository.getModel();
  }

  protected setupAssociation(): void {
    const UserModel = this.userRepository.getModel();
    const UserRoleModel = this.userRoleRepository.getModel();
    const RoleModel = this.roleRepository.getModel();
    const PostModel = this.postRepository.getModel();

    UserModel.belongsToMany(RoleModel, {
      through: UserRoleModel,
      foreignKey: 'userId',
      otherKey: 'roleId',
    });

    UserModel.hasMany(PostModel, {
      foreignKey: 'userId',
    });
  }

  protected setupIncludeOptions(): void {
    this.includeOptions.set(includeKey.userRole, {
      model: this.roleRepository.getModel(),
    });

    this.includeOptions.set(includeKey.userPost, {
      model: this.postRepository.getModel(),
    });

    this.includeOptions.set(includeKey.userRolePost, [
      {
        model: this.roleRepository.getModel(),
      },
      {
        model: this.postRepository.getModel(),
      },
    ]);
  }

  getIncludeOption(key: string) {
    return this.includeOptions.get(key);
  }

  // util method
  getUserRepository() {
    return this.userRepository;
  }

  getUserRoleRepository() {
    return this.userRoleRepository;
  }

  getRoleRepository() {
    return this.roleRepository;
  }

  getPostRepository() {
    this.postRepository;
  }
}
