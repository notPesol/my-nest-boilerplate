import { Module } from '@nestjs/common';
import { NatsService } from './service';

@Module({
  providers: [NatsService],
  exports: [NatsService],
})
export class NatsModule {}
