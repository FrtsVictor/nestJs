import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface Test {
  database: {
    host: string;
    port: number;
  };

  http: {
    host: string;
    port: number;
  };
}

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService<Test, true>) {}

  asd = this.configService.get('database.host', { infer: true });
  port = this.configService.get('database.port', { infer: true });
}
