import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthGuardFake } from './auth.guard.fake';
import { AuthGuard } from '../src/auth/auth.guard';
import { RolesGuardFake } from './roles.guard.fake';
import { RolesGuard } from '../src/auth/rbac/roles.guard';
describe('OrganizationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthGuard)
      .useClass(AuthGuardFake)
      .overrideProvider(RolesGuard)
      .useClass(RolesGuardFake)
      .compile();


    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/organizations (GET)', () => {
    return request(app.getHttpServer())
      .get('/organizations')
      .expect(200)
      .expect([{ id: "1", name: 'Starter Kit Organization' },]);
  });
  it('/organizations (POST)', () => {
    return request(app.getHttpServer())
      .post('/organizations')
      .send({ name: 'Starter Kit Organization 2' })
      .expect(201)
      .expect({ id: "2", name: 'Starter Kit Organization 2' });
  });
  it('/organizations/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/organizations/1')
      .send({ name: 'Starter Kit Organization 3' })
      .expect(200)
      .expect({ id: "1", name: 'Starter Kit Organization 3' });
  });
});
