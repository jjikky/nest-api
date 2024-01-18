import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
	@IsString()
	readonly title: string;

	@IsNumber()
	readonly year: number;

	@IsOptional()
	// 요소 모두 검사
	@IsString({ each: true })
	readonly genres: string[];
}
