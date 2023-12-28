import { Injectable } from '@nestjs/common';
import Organization from './organization.model';

@Injectable()
export class OrganizationService {

    updateOrganization(id: string, name: string): Organization {
        return new Organization(id, name)
    }

    createOrganization(name: string): Organization {
        return new Organization("2", name)
    }

    getOrganizations(): Organization[] {
        // Logic to fetch organizations from the database or any other source
        return [{
            id: "1",
            name: 'Starter Kit Organization',
        },];
    }
}
