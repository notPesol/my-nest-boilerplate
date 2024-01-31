import { Injectable } from '@nestjs/common';
import { NatsService } from 'src/common/nats/service';
import { TmpNatsDTO } from './dto/dto';

@Injectable()
export class TmpNatsService {
  constructor(private readonly natsService: NatsService) {}

  doSomething(body: TmpNatsDTO) {
    this.natsService.publish(body.subject, body.payload)
  }
}
