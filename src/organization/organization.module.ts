import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [],
    controllers: [OrganizationController],
    providers: [OrganizationService, ConfigService],
})
export class OrganizationModule {}
