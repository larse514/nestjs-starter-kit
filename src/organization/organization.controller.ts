import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import Organization from './organization.model';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDTO } from './organization.dto';
import { Roles } from '../auth/rbac/roles.decorator';
import { Role } from '../auth/rbac/roles';
import { LoggerProvider } from '../logging/logger.provider';
import { ApiResponse } from '@nestjs/swagger';

@Controller('organizations')
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@ApiResponse({
  status: 403,
  description: 'Forbidden',
})
@ApiResponse({
  status: 500,
  description: 'Internal Server Error',
})
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService,
    private readonly logger: LoggerProvider
  ) {
  }

  @Post()
  @Roles(Role.Admin)
  @ApiResponse({
    type: Organization,
    status: 201,
  })
  createOrganization(
    @Body() createRequest: CreateOrganizationDTO,
  ): Organization {
    return this.orgService.createOrganization(createRequest.name);
  }

  @Put(':id')
  @ApiResponse({
    type: Organization,
  })
  updateOrganization(
    @Param('id') id: string,
    @Body() createRequest: CreateOrganizationDTO,
  ): Organization {
    return this.orgService.updateOrganization(id, createRequest.name);
  }

  @Get()
  @ApiResponse({
    type: Organization,
    isArray: true,
  })
  getOrganizations(@Query("name") name: string): Organization[] {
    name && this.logger.info(`Getting organizations with name ${name}`);
    this.logger.info('Getting organizations');
    return this.orgService.getOrganizations();
  }
}
