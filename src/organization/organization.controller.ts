import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import Organization from './organization.model';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDTO } from './organization.dto';
import { Roles } from '../auth/rbac/roles.decorator';
import { Role } from '../auth/rbac/roles';

@Controller('organizations')
export class OrganizationController {

    constructor(private readonly orgService: OrganizationService) { }

    @Post()
    @Roles(Role.Admin)
    createOrganization(@Body() createRequest: CreateOrganizationDTO): Organization {

        return this.orgService.createOrganization(createRequest.name);
    }

    @Put(':id')
    updateOrganization(@Param('id') id: string, @Body() createRequest: CreateOrganizationDTO): Organization {
        return this.orgService.updateOrganization(id, createRequest.name);
    }

    @Get()
    getOrganizations(): Organization[] {
        return this.orgService.getOrganizations();
    }
}
