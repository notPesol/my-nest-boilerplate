import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from 'src/common/sequelize/module';
import { UserRoleRepository } from './repository';
import { RoleModule } from 'src/role/module';
import { UserModule } from 'src/user/module';

@Module({
  imports: [SequelizeModule, RoleModule, forwardRef(() => UserModule)],
  providers: [UserRoleRepository],
  exports: [UserRoleRepository],
})
export class UserRoleModule {}
