import { Injectable } from '@nestjs/common';
import Organization from './organization.model';

@Injectable()
export class OrganizationService {
    
    getOrganizations(): Organization[] {
        // Logic to fetch organizations from the database or any other source
        return [{
            id: 1,
            name: 'Starter Kit Organization',
        },];
    }
}
