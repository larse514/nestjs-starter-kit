import { Injectable } from '@nestjs/common';
import { logger } from '../logging/logger';
import { CloudwatchPublisher } from '../metrics/cloudwatch.publisher';

@Injectable()
export class OrganizationInstrumentation {
  constructor(private readonly cloudwatchPublisher: CloudwatchPublisher) {}

  async organizationCreateSucceeded() {
    logger.info('Organization created successfully');
    await this.cloudwatchPublisher.publishMetric(
      'OrganizationCreateSucceeded',
      1,
    );
  }

  async organizationCreateFailed() {
    logger.error('Organization creation failed');
    await this.cloudwatchPublisher.publishMetric('OrganizationCreateFailed', 1);
  }
}
