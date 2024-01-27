import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from 'src/common/sequelize/module';
import { UserRepository } from './repository';
import { JwtModule } from '@nestjs/jwt';
import { UserRoleModule } from 'src/user-role/module';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: { expiresIn: '7d' }, // Set your desired sign options
        };
      },
    }),
    forwardRef(() => UserRoleModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
