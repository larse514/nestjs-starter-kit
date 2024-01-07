import { OrganizationInstrumentation } from '../../src/organization/organization.instrumentation';
import { MockType } from '../utils/mocktype';

export const MockInstrumentation: () => MockType<OrganizationInstrumentation> =
  jest.fn(() => ({
    organizationCreateSucceeded: jest.fn(),
    organizationCreateFailed: jest.fn(),
  }));
