import { IsNumber, IsString } from 'class-validator';

export class createMovieDto {
	@IsString()
	readonly title: string;

	@IsNumber()
	readonly year: number;

	// 요소 모두 검사
	@IsString({ each: true })
	readonly genres: string[];
}
