import { Injectable } from '@nestjs/common';
import Organization from './organization.model';
import { ConfigService } from '@nestjs/config';
import { OrganizationInstrumentation } from './organization.instrumentation';
import { LoggerProvider } from '../logging/logger.provider';

@Injectable()
export class OrganizationService {
  constructor(
    private configService: ConfigService,
    private readonly organizationInstrumentation: OrganizationInstrumentation,
    private readonly logger: LoggerProvider
  ) { }

  updateOrganization(id: string, name: string): Organization {
    return new Organization(id, name);
  }

  createOrganization(name: string): Organization {
    try {

      this.organizationInstrumentation.organizationCreateSucceeded();
      return new Organization('2', name);
    } catch (error) {
      this.organizationInstrumentation.organizationCreateFailed();
      throw error;
    }
  }

  getOrganizations(): Organization[] {
    this.logger.debug(this.configService.get<string>('environment'));
    return [
      {
        id: '1',
        name: 'Starter Kit Organization',
      },
    ];
  }
}
