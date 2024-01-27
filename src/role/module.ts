import { Module } from '@nestjs/common';
import { RoleService } from './service';
import { RoleController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { RoleRepository } from './repository';

@Module({
  imports: [SequelizeModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
