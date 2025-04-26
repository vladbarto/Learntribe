// src/lectures/lectures.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lecture, LectureDocument } from './schemas/lecture.schema';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { QueryLectureDto } from './dto/query-lecture.dto';

@Injectable()
export class LecturesService {
  constructor(
    @InjectModel(Lecture.name) private lectureModel: Model<LectureDocument>,
  ) {}

  async create(createLectureDto: CreateLectureDto): Promise<Lecture> {
    const createdLecture = new this.lectureModel({
      ...createLectureDto,
      startDate: new Date(createLectureDto.startDate),
      endDate: new Date(createLectureDto.endDate),
    });
    return createdLecture.save();
  }

  async findAll(queryParams?: QueryLectureDto): Promise<Lecture[]> {
    const filter: any = {};

    // Domain filter
    if (queryParams?.domain) {
      filter.domain = { $regex: queryParams.domain, $options: 'i' };
    }

    // Title filter
    if (queryParams?.title) {
      filter.title = { $regex: queryParams.title, $options: 'i' };
    }

    // Offer filter
    if (queryParams?.offer === true) {
      filter.offer = { $gt: 0 };
    }

    // Date range filter: check for any overlap between lecture dates and selected range
    if (queryParams?.startDate && queryParams?.endDate) {
      filter.$and = [
        { startDate: { $lte: new Date(queryParams.endDate) } },
        { endDate: { $gte: new Date(queryParams.startDate) } },
      ];
    }

    const lectures = await this.lectureModel.find(filter).exec();

    // Sort Romanian lectures first
    const sortedLectures = lectures.sort((a, b) => {
      const aHasRomanian = a.languages?.some(lang => lang.toLowerCase().includes('romanian'));
      const bHasRomanian = b.languages?.some(lang => lang.toLowerCase().includes('romanian'));
      return aHasRomanian === bHasRomanian ? 0 : aHasRomanian ? -1 : 1;
    });

    return sortedLectures;
  }

  async findOne(id: string): Promise<Lecture> {
    const objectId = new Types.ObjectId(id);

    const lecture = await this.lectureModel.findById(objectId).exec();

    if (!lecture) {
      throw new NotFoundException(`Lecture with ID ${id} not found`);
    }

    return lecture;
  }

  async update(id: string, updateLectureDto: UpdateLectureDto): Promise<Lecture> {
    const updateData: any = { ...updateLectureDto };

    // Type safety for startDate and endDate
    if ('startDate' in updateLectureDto && updateLectureDto.startDate) {
      updateData.startDate = new Date(updateLectureDto.startDate);
    }

    if ('endDate' in updateLectureDto && updateLectureDto.endDate) {
      updateData.endDate = new Date(updateLectureDto.endDate);
    }

    const updatedLecture = await this.lectureModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedLecture) {
      throw new NotFoundException(`Lecture with ID ${id} not found`);
    }

    return updatedLecture;
  }

  async remove(id: string): Promise<void> {
    const result = await this.lectureModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Lecture with ID ${id} not found`);
    }
  }

  async incrementTotalEnrolled(lectureId: string): Promise<Lecture> {
    if (!Types.ObjectId.isValid(lectureId)) {
      throw new BadRequestException('Invalid lecture ID format');
    }

    const updatedLecture = await this.lectureModel.findOneAndUpdate(
      { _id: new Types.ObjectId(lectureId) },
      { $inc: { totalEnrolled: 1 } },
      { new: true }
    ).exec();

    if (!updatedLecture) {
      throw new NotFoundException(`Lecture with ID ${lectureId} not found`);
    }

    return updatedLecture;
  }
}