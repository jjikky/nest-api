import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { createMovieDto } from './dto/create-movie.dto.';

@Injectable()
export class MoviesService {
	private movies: Movie[] = [];

	getAll(): Movie[] {
		return this.movies;
	}

	getOne(id: number): Movie {
		const movie = this.movies.find((movie) => movie.id === id);
		if (!movie) throw new NotFoundException(`movie with id ${id} not found`);
		return movie;
	}

	deleteOne(id: number): void {
		this.getOne(id);
		this.movies = this.movies.filter((movie) => movie.id !== +id);
	}

	create(movieData: createMovieDto) {
		this.movies.push({
			id: this.movies.length + 1,
			...movieData,
		});
	}

	update(id: number, updateData: createMovieDto) {
		const movie = this.getOne(id);
		this.deleteOne(id);
		this.movies.push({ ...movie, ...updateData });
	}
}
