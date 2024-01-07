import { Test, TestingModule } from '@nestjs/testing';
import { PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import { CloudwatchPublisher } from './cloudwatch.publisher';
import { ConfigService } from '@nestjs/config';
import { CloudwatchModule } from './cloudwatch.module';
import { CloudwatchClient } from './cloudwatch.client';

describe('CloudwatchPublisher', () => {
  let cloudwatchPublisher: CloudwatchPublisher;
  class MockCloudwatchClient {
    client = {
      send: jest.fn(),
    };

    clientInstance() {
      return this.client;
    }
  }
  const cloudwatchClient = new MockCloudwatchClient();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CloudwatchModule],
      providers: [ConfigService],
    })
      .overrideProvider(CloudwatchClient)
      .useValue(cloudwatchClient)
      .compile();

    cloudwatchPublisher = module.get<CloudwatchPublisher>(CloudwatchPublisher);
  });

  it('should be defined', () => {
    expect(cloudwatchPublisher).toBeDefined();
  });

  describe('publishMetric', () => {
    it('should send metric data to CloudWatch', async () => {
      const name = 'TestMetric';
      const value = 100;

      await cloudwatchPublisher.publishMetric(name, value);
      expect(cloudwatchClient.client.send).toHaveBeenCalledWith(
        expect.any(PutMetricDataCommand),
      );
    });
  });
});
