// src/lectures/dto/create-lecture.dto.ts
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateLectureDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  domain: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfSessions: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  offer: number;

  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalPlaces: number;

  @IsNumber()
  @IsPositive()
  totalEnrolled: number;

  @IsString()
  teacherId: string;
}
