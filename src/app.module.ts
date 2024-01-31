import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/module';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { SequelizeModule } from './common/sequelize/module';
import { AuthGuard } from './common/guard/auth.guard';
import { RoleModule } from './role/module';
import { RolesGuard } from './common/guard/roles.guard';
import { PostModule } from './post/module';
import { UserAssociationModule } from './user-association/module';
import { AuthModule } from './auth/module';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { NatsModule } from './common/nats/module';
import { TmpNatsModule } from './tmp-nats/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    NatsModule,
    SequelizeModule,
    UserModule,
    RoleModule,
    PostModule,
    UserAssociationModule,
    AuthModule,
    TmpNatsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
