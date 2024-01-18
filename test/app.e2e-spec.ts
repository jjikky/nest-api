import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	// beforeEach가 아닌 All로 함으로써 POST에서 만든 게시물이 초기화 되지 않음
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true,
			}),
		);
		await app.init();
	});
	const MOVIES = '/movies';
	const MOVIES_WITH_ID = '/movies/:id';

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/').expect(200).expect('Hello');
	});

	describe(MOVIES, () => {
		it('GET 200', () => {
			return request(app.getHttpServer()).get(MOVIES).expect(200).expect([]);
		});

		it('POST 201', () => {
			return request(app.getHttpServer())
				.post(MOVIES)
				.send({ title: 'Test Moive', genres: ['test'], year: 2000 })
				.expect(201);
		});
		it('POST 400', () => {
			return request(app.getHttpServer())
				.post(MOVIES)
				.send({ title: 'Test Moive', genres: ['test'], year: 2000, other: 'thing' })
				.expect(400);
		});

		it('DELETE', () => {
			return request(app.getHttpServer()).delete(MOVIES).expect(404);
		});
	});

	describe(MOVIES_WITH_ID, () => {
		it('GET 200', () => {
			// e2e test에서 validation pipe의 transform이 적용되지 않아서 id 값인 1이 string으로 들어가기 떄문에 미작동함
			// 따라서 test에서도 useGlobalPipe 사용 잊지 말 것
			return request(app.getHttpServer()).get('/movies/1').expect(200);
		});
		it('GET 404', () => {
			return request(app.getHttpServer()).get('/movies/999').expect(404);
		});

		it('PATCH 200', () => {
			return request(app.getHttpServer()).patch('/movies/1').send({ title: 'Updated Test' }).expect(200);
		});

		it('DELETE 200', () => {
			return request(app.getHttpServer()).delete('/movies/1').expect(200);
		});
	});
});
