import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthGuard } from '../src/auth/auth.guard';
import { AuthGuardFake } from './fakes/auth.guard.fake';
import { RolesGuardFake } from './fakes/roles.guard.fake';
import { RolesGuard } from '../src/auth/rbac/roles.guard';
import { MockInstrumentation } from './mocks/organization.instrumentation.mock';
import { OrganizationService } from '../src/organization/organization.service';
import { OrganizationInstrumentation } from '../src/organization/organization.instrumentation';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockInstrumentation = MockInstrumentation();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: OrganizationInstrumentation,
          useValue: mockInstrumentation,
        },
      ],
    })
      .overrideProvider(AuthGuard)
      .useClass(AuthGuardFake)
      .overrideProvider(RolesGuard)
      .useClass(RolesGuardFake)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
