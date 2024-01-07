import { CloudWatch } from '@aws-sdk/client-cloudwatch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudwatchClient {
  private readonly client: CloudWatch;
  constructor() {
    this.client = new CloudWatch({});
  }

  clientInstance(): CloudWatch {
    return this.client;
  }
}
