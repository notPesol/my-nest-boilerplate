import { Module } from '@nestjs/common';
import { UserAssociationRepository } from './repository';
import { UserRoleModule } from 'src/user-role/module';
import { RoleModule } from 'src/role/module';
import { UserModule } from 'src/user/module';
import { PostModule } from 'src/post/module';

@Module({
  imports: [UserModule, RoleModule, UserRoleModule, PostModule],
  providers: [UserAssociationRepository],
  exports: [UserAssociationRepository],
})
export class UserAssociationModule {}
