// src/enrollments/enrollments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async findEnrollmentByLectureId(lectureId: string): Promise<Enrollment[]> {
    // Convert string lectureId to MongoDB ObjectId
    const objectId = new Types.ObjectId(lectureId);
    return this.enrollmentModel.find({ lectureId: objectId }).exec();
  }

  async enroll(request: CreateEnrollmentDto): Promise<Enrollment> {
    const exists = await this.enrollmentModel.findOne(request);
    if (exists) throw new Error('Already enrolled');

    const enrollment = new this.enrollmentModel(request);
    return enrollment.save();
  }

  async alreadyEnrolled(userId: string, lectureId: string): Promise<boolean> {
    const enrollment = await this.enrollmentModel
      .findOne({
        userId: new Types.ObjectId(userId),
        lectureId: new Types.ObjectId(lectureId),
      })
      .exec();

    return !!enrollment;
  }
}
