import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

describe('OrganizationController', () => {
    let controller: OrganizationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({
                load: [configuration],
              })],
            controllers: [OrganizationController],
            providers: [OrganizationService],
        }).compile();

        controller = module.get<OrganizationController>(OrganizationController);
    });

    describe('Organization Controller Tests', () => {
        it('getOrganizations should return organizations', () => {
            expect(controller.getOrganizations()).toMatchObject([
                { id: "1", name: 'Starter Kit Organization' },
            ]);
        });
        it('createOrganization should return organization', () => {
            expect(controller.createOrganization({
                name: 'Starter Kit Organization 2',
            })).toMatchObject(
                { id: "2", name: 'Starter Kit Organization 2' },
            );
        });
        it('updateOrganization should return organization', () => {
            expect(controller.updateOrganization("1", {
                name: 'Starter Kit Organization 3',
            })).toMatchObject(
                { id: "1", name: 'Starter Kit Organization 3' },
            );
        });
    });
});
