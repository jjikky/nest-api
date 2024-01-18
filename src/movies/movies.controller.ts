import { MoviesService } from './movies.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { Movie } from './entities/movie.entity';
import { createMovieDto } from './dto/create-movie.dto.';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Get()
	getAll(): Movie[] {
		return this.moviesService.getAll();
	}

	@Post()
	create(@Body() movieData: createMovieDto) {
		return this.moviesService.create(movieData);
	}

	@Get('search')
	search(@Query('year') searchingYear: string) {
		return `search movie ${searchingYear}`;
	}

	@Get('/:id')
	getOne(@Param('id') id: string): Movie {
		return this.moviesService.getOne(id);
	}

	@Delete('/:id')
	remove(@Param('id') id: string) {
		return this.moviesService.deleteOne(id);
	}

	@Patch(':/id')
	path(@Param('id') movieId: string, @Body() updateData: createMovieDto) {
		return this.moviesService.update(movieId, updateData);
	}
}
