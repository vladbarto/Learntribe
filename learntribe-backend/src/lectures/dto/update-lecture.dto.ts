// src/lectures/dto/update-lecture.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateLectureDto } from './create-lecture.dto';

export class UpdateLectureDto extends PartialType(CreateLectureDto) {}

// src/lectures/dto/query-lecture.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class QueryLectureDto {
  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  title?: string;
}