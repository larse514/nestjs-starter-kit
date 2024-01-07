import { Injectable } from '@nestjs/common';
import { logger } from '../logging/logger';
import {
  PutMetricDataCommand,
  PutMetricDataInput,
} from '@aws-sdk/client-cloudwatch';
import { ConfigService } from '@nestjs/config';
import { CloudwatchClient } from './cloudwatch.client';

@Injectable()
export class CloudwatchPublisher {
  constructor(
    private readonly configService: ConfigService,
    private readonly cloudwatchClient: CloudwatchClient,
  ) {}

  async publishMetric(name: string, value: number) {
    
    const namespace = this.configService.get<string>('serviceName');
    const params: PutMetricDataInput = {
      Namespace: namespace,
      MetricData: [
        {
          MetricName: name,
          Dimensions: [
            {
              Name: 'Environment',
              Value: this.configService.get<string>('environment'),
            },
          ],
          Unit: 'Count',
          Value: value,
        },
      ],
    };

    const command = new PutMetricDataCommand(params);
    try {
      await this.cloudwatchClient.clientInstance().send(command);
    } catch (error) {
      logger.error(`Failed to publish metric ${namespace}/${name} `, error);
    }
  }
}
