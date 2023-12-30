import { Injectable } from '@nestjs/common';
import Organization from './organization.model';
import { ConfigService } from '@nestjs/config';
import { logger } from '../logging/logger';

@Injectable()
export class OrganizationService {

    constructor(private configService: ConfigService) { }

    updateOrganization(id: string, name: string): Organization {
        return new Organization(id, name)
    }

    createOrganization(name: string): Organization {
        return new Organization("2", name)
    }

    getOrganizations(): Organization[] {
        logger.debug('My first log message');
        return [{
            id: "1",
            name: 'Starter Kit Organization',
        },];
    }
}
