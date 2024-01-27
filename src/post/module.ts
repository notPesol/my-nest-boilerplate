import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './service';
import { PostController } from './controller';
import { SequelizeModule } from 'src/common/sequelize/module';
import { PostRepository } from './repository';
import { UserModule } from 'src/user/module';

@Module({
  imports: [
    SequelizeModule,
    forwardRef(() => UserModule),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostService, PostRepository],
})
export class PostModule {}
