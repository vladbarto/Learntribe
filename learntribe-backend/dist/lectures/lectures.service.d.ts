import { Model } from 'mongoose';
import { Lecture, LectureDocument } from './schemas/lecture.schema';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { QueryLectureDto } from './dto/query-lecture.dto';
export declare class LecturesService {
    private lectureModel;
    constructor(lectureModel: Model<LectureDocument>);
    create(createLectureDto: CreateLectureDto): Promise<Lecture>;
    findAll(queryParams?: QueryLectureDto): Promise<Lecture[]>;
    findOne(id: string): Promise<Lecture>;
    update(id: string, updateLectureDto: UpdateLectureDto): Promise<Lecture>;
    remove(id: string): Promise<void>;
}
