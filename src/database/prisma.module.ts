import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ApplicationLoggerModule } from '@app-core/logger/application-logger.module';

@Module({
  imports: [ApplicationLoggerModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
