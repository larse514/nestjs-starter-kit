import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';

describe('OrganizationController', () => {
    let controller: OrganizationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrganizationController],
            providers: [],
        }).compile();

        controller = module.get<OrganizationController>(OrganizationController);
    });

    describe('Organization Controller Tests', () => {
        it('should return organizations', () => {
            expect(controller.getOrganizations()).toMatchObject([
                { id: 1, name: 'Starter Kit Organization' },
            ]);
        });
    });
});
