import { CreateLectureDto } from './create-lecture.dto';
declare const UpdateLectureDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLectureDto>>;
export declare class UpdateLectureDto extends UpdateLectureDto_base {
}
export declare class QueryLectureDto {
    domain?: string;
    language?: string;
    title?: string;
}
export {};
