// src/enrollments/enrollments.controller.ts
import { Controller, Post, Body, BadRequestException, Get, Param, Query } from '@nestjs/common';
import { EnrollmentsService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post('enroll')
  async enroll(@Body() body: CreateEnrollmentDto) {
    try {
      return await this.enrollmentsService.enroll(body);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(err.message);
    }
  }

  @Get('already-enrolled/:lectureId/:userId')
  async alreadyEnrolled(
    @Param('lectureId') lectureId: string,
    @Param('userId') userId: string,
  ) {
    try {
      return await this.enrollmentsService.alreadyEnrolled(userId, lectureId);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('lecture/:lectureId')
  async getEnrollmentsByLecture(@Param('lectureId') lectureId: string) {
    try {
      // Call service method with a single lectureId (instead of an array)
      const enrollments =
        await this.enrollmentsService.findEnrollmentByLectureId(lectureId);
      return enrollments;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
