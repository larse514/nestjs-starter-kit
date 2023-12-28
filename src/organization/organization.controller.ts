import { Controller, Get } from '@nestjs/common';
import Organization from './organization.model';
import { OrganizationService } from './organization.service';

@Controller('organizations')
export class OrganizationController {

    constructor(private readonly orgService: OrganizationService) {}

    @Get()
    getOrganizations(): Organization[] {
        return this.orgService.getOrganizations();
    }
}
