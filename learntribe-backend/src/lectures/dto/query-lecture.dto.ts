// src/lectures/dto/query-lecture.dto.ts
import { IsOptional, IsString, IsArray, IsBoolean, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryLectureDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  offer?: boolean;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
