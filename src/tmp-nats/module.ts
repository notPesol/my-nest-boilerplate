import { Module } from '@nestjs/common';
import { NatsModule } from 'src/common/nats/module';
import { TmpNatsService } from './service';
import { TmpNatsController } from './controller';

@Module({
  imports: [NatsModule],
  providers: [TmpNatsService],
  controllers: [TmpNatsController],
})
export class TmpNatsModule {}
