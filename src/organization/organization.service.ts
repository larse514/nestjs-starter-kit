import { Injectable } from '@nestjs/common';
import Organization from './organization.model';
import { ConfigService } from '@nestjs/config';

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
        console.log(this.configService.get<string>('environment'));        
        return [{
            id: "1",
            name: 'Starter Kit Organization',
        },];
    }
}
