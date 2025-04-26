import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { QueryLectureDto } from './dto/query-lecture.dto';
import { Lecture } from './schemas/lecture.schema';
export declare class LecturesController {
    private readonly lecturesService;
    constructor(lecturesService: LecturesService);
    create(createLectureDto: CreateLectureDto): Promise<Lecture>;
    findAll(query: QueryLectureDto): Promise<Lecture[]>;
    findOne(id: string): Promise<Lecture>;
    update(id: string, updateLectureDto: UpdateLectureDto): Promise<Lecture>;
    remove(id: string): Promise<void>;
    incrementEnrollment(id: string): Promise<Lecture>;
}
