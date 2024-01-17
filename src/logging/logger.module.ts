import { Module } from '@nestjs/common';
import { LoggerProvider } from './logger.provider';

@Module({
  providers: [LoggerProvider],
  exports: [LoggerProvider],
})
export class LoggerModule {}