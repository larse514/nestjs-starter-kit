import { Injectable } from '@nestjs/common';
import Organization from './organization.model';
import { ConfigService } from '@nestjs/config';
import { logger } from '../logging/logger';
import { OrganizationInstrumentation } from './organization.instrumentation';

@Injectable()
export class OrganizationService {
  constructor(
    private configService: ConfigService,
    private readonly organizationInstrumentation: OrganizationInstrumentation,
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
    }
  }

  getOrganizations(): Organization[] {
    logger.debug(this.configService.get<string>('environment'));
    return [
      {
        id: '1',
        name: 'Starter Kit Organization',
      },
    ];
  }
}
