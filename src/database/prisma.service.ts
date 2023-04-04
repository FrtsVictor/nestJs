import { ApplicationLogger } from '@app-core/logger/application-logger.log';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly appLogger: ApplicationLogger) {
    appLogger.setContext(PrismaService.name);

    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();

      this.appLogger.verbose(
        `Query ${params.model}.${params.action} took ${after - before}ms`,
      );

      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
