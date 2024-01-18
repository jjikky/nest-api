import { MoviesService } from './movies.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto.';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Get()
	getAll(): Movie[] {
		return this.moviesService.getAll();
	}

	@Post()
	create(@Body() movieData: CreateMovieDto) {
		return this.moviesService.create(movieData);
	}

	@Get('search')
	search(@Query('year') searchingYear: string) {
		return `search movie ${searchingYear}`;
	}

	@Get('/:id')
	getOne(@Param('id') id: number): Movie {
		return this.moviesService.getOne(id);
	}

	@Delete('/:id')
	remove(@Param('id') id: number) {
		return this.moviesService.deleteOne(id);
	}

	@Patch(':/id')
	path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
		return this.moviesService.update(movieId, updateData);
	}
}
