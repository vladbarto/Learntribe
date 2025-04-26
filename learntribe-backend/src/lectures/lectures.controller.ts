// src/lectures/lectures.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe, NotFoundException,
} from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { QueryLectureDto } from './dto/query-lecture.dto';
import { Lecture } from './schemas/lecture.schema';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Post('one')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLectureDto: CreateLectureDto): Promise<Lecture> {
    return this.lecturesService.create(createLectureDto);
  }

  @Get('all')
  findAll(
    @Query(new ValidationPipe({ transform: true })) query: QueryLectureDto
  ): Promise<Lecture[]> {
    return this.lecturesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Lecture> {
    return this.lecturesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLectureDto: UpdateLectureDto,
  ): Promise<Lecture> {
    return this.lecturesService.update(id, updateLectureDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.lecturesService.remove(id);
  }

  @Patch('increment/:id')
  async incrementEnrollment(@Param('id') id: string) {
    const updatedLecture = await this.lecturesService.incrementTotalEnrolled(id);
    if (!updatedLecture) {
      throw new NotFoundException(`Lecture with ID ${id} not found`);
    }
    return updatedLecture;
  }
}