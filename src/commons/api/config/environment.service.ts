import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataBaseConfig } from './typeorm.config';
import { HttpConfig } from './http.config';

interface IConfiguration {
  database: DataBaseConfig;
  http: HttpConfig;
}

@Injectable()
export class AppEnvironmentService {
  constructor(
    private readonly configService: ConfigService<IConfiguration, true>,
  ) {}

  databaseConfig = this.configService.get<DataBaseConfig>('database', {
    infer: true,
  });

  httpConfig = this.configService.get('http', { infer: true });
}
