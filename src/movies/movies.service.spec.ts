import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
	let service: MoviesService;

	// test 전 실행
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MoviesService],
		}).compile();

		service = module.get<MoviesService>(MoviesService);
		service.create({
			title: 'Test Moive',
			genres: ['test'],
			year: 2000,
		});
	});

	// beforeEach, afterEach, beforeALl, afterALL 등 다양한 hook지원
	// afterAll(()=>{
	// clean database
	// })

	// test 하는 부분
	// it > individual test
	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getAll', () => {
		it('should be return an array', () => {
			const result = service.getAll();
			// result가 배열 instance 인지 test
			expect(result).toBeInstanceOf(Array);
		});
	});

	describe('getOne', () => {
		it('should return a movie', () => {
			const movie = service.getOne(1);
			//undefined test
			expect(movie).toBeDefined();
			expect(movie.id).toEqual(1);
		});

		it('should throw NotFoundException', () => {
			try {
				service.getOne(999);
			} catch (err) {
				expect(err).toBeInstanceOf(NotFoundException);
				expect(err.message).toEqual(`movie with id ${999} not found`);
			}
		});
	});

	describe('deleteOne', () => {
		it('deletes a movie', () => {
			const beforeDelete = service.getAll().length;
			service.deleteOne(1);
			const afterDelete = service.getAll().length;
			expect(afterDelete).toEqual(beforeDelete - 1);
			// expect(afterDelete).toBeLessThan(allMovies);
		});
		it('should throw NotFoundException', () => {
			try {
				service.deleteOne(999);
			} catch (err) {
				expect(err).toBeInstanceOf(NotFoundException);
			}
		});
	});

	describe('create', () => {
		it('should create a movie', () => {
			const beforeCreate = service.getAll().length;
			service.create({
				title: 'Test Moive',
				genres: ['test'],
				year: 2000,
			});
			const afterCreate = service.getAll().length;
			expect(afterCreate).toEqual(beforeCreate + 1);
			// expect(afterCreate).toBeGreaterThan(beforeCreate);
		});
	});

	describe('update', () => {
		it('should update a movie', () => {
			service.update(1, { title: 'Update Test' });
			const movie = service.getOne(1);
			expect(movie.title).toEqual('Update Test');
		});
		it('should throw NotFoundException', () => {
			try {
				service.update(999, { title: 'Update Test' });
			} catch (err) {
				expect(err).toBeInstanceOf(NotFoundException);
			}
		});
	});
});
