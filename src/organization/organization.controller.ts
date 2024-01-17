import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import Organization from './organization.model';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDTO } from './organization.dto';
import { Roles } from '../auth/rbac/roles.decorator';
import { Role } from '../auth/rbac/roles';
import { LoggerProvider } from '../logging/logger.provider';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService,
    private readonly logger: LoggerProvider
  ) {
  }

  @Post()
  @Roles(Role.Admin)
  createOrganization(
    @Body() createRequest: CreateOrganizationDTO,
  ): Organization {
    return this.orgService.createOrganization(createRequest.name);
  }

  @Put(':id')
  updateOrganization(
    @Param('id') id: string,
    @Body() createRequest: CreateOrganizationDTO,
  ): Organization {
    return this.orgService.updateOrganization(id, createRequest.name);
  }

  @Get()
  getOrganizations(): Organization[] {
    this.logger.info('Getting organizations');
    return this.orgService.getOrganizations();
  }
}
