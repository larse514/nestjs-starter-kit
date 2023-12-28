import { Controller, Get } from '@nestjs/common';
import Organization from './organization.model';

@Controller('organizations')
export class OrganizationController {
    @Get()
    getOrganizations(): Organization[] {
        return [
            {
                id: 1,
                name: 'Starter Kit Organization',
            },
        ];
    }
}
