import { Module } from '@nestjs/common';
import { CloudwatchPublisher } from './cloudwatch.publisher';
import { ConfigService } from '@nestjs/config';
import { CloudwatchClient } from './cloudwatch.client';

@Module({
  imports: [],
  controllers: [],
  providers: [CloudwatchPublisher, CloudwatchClient, ConfigService],
  exports: [CloudwatchPublisher],
})
export class CloudwatchModule {}
