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
  ValidationPipe, NotFoundException, UseGuards,
} from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { QueryLectureDto } from './dto/query-lecture.dto';
import { Lecture } from './schemas/lecture.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLectureDto: UpdateLectureDto,
  ): Promise<Lecture> {
    return this.lecturesService.update(id, updateLectureDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.lecturesService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('increment/:id')
  async incrementEnrollment(@Param('id') id: string) {
    const updatedLecture = await this.lecturesService.incrementTotalEnrolled(id);
    if (!updatedLecture) {
      throw new NotFoundException(`Lecture with ID ${id} not found`);
    }
    return updatedLecture;
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher/:teacherId')
  findByTeacher(@Param('teacherId') teacherId: string): Promise<Lecture[]> {
    return this.lecturesService.findByTeacher(teacherId);
  }
}
