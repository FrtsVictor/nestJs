import { Module } from '@nestjs/common';
import { ApplicationLogger } from './application-logger.log';

@Module({
  providers: [ApplicationLogger],
  exports: [ApplicationLogger],
})
export class ApplicationLoggerModule {}
