import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { OrganizationInstrumentation } from './organization.instrumentation';
import { MockInstrumentation } from '../../test/mocks/organization.instrumentation.mock';

describe('OrganizationController', () => {
  let controller: OrganizationController;

  const mockInstrumentation = MockInstrumentation();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      controllers: [OrganizationController],
      providers: [
        OrganizationService,
        {
          provide: OrganizationInstrumentation,
          useValue: mockInstrumentation,
        },
      ],
    }).compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  describe('Organization Controller Tests', () => {
    it('getOrganizations should return organizations', () => {
      expect(controller.getOrganizations()).toMatchObject([
        { id: '1', name: 'Starter Kit Organization' },
      ]);
    });
    it('when organization is created then return organization', () => {
      expect(
        controller.createOrganization({
          name: 'Starter Kit Organization 2',
        }),
      ).toMatchObject({ id: '2', name: 'Starter Kit Organization 2' });
    });
    it('when organization is created then metric is published', () => {
      controller.createOrganization({
        name: 'Starter Kit Organization 2',
      });
      expect(mockInstrumentation.organizationCreateSucceeded).toBeCalled();
    });

    it('updateOrganization should return organization', () => {
      expect(
        controller.updateOrganization('1', {
          name: 'Starter Kit Organization 3',
        }),
      ).toMatchObject({ id: '1', name: 'Starter Kit Organization 3' });
    });
  });
});
