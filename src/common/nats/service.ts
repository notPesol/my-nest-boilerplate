import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, StringCodec, JSONCodec } from 'nats';

interface INatsServers {
  server: string;
  user: string;
  pass: string;
}

@Injectable()
export class NatsService implements OnModuleDestroy, OnModuleInit {
  private natsConfig: INatsServers;
  private natConnection;

  constructor(private readonly configService: ConfigService) {
    this.natsConfig = configService.get<INatsServers>('nats');
  }

  publish(subject: string, payload: any) {
    let codec = JSONCodec();
    if (typeof payload === 'string') {
      codec = StringCodec();
    }
    this.natConnection.publish(subject, codec.encode(payload));
  }

  async onModuleInit() {
    this.natConnection = await connect({
      servers: [this.natsConfig.server],
      user: this.natsConfig.user,
      pass: this.natsConfig.pass,
    });
    console.log(`connected to ${this.natConnection.getServer()}`);
  }

  async onModuleDestroy() {
    // this promise indicates the client closed
    const done = this.natConnection?.closed();

    if (this.natConnection?.close) {
      await this.natConnection?.close();

      // check if the close was OK
      const err = await done;
      if (err) {
        console.log(`error closing:`, err);
      }
    }
  }
}
