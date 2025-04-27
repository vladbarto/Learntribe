import { HydratedDocument } from 'mongoose';
export type LectureDocument = HydratedDocument<Lecture>;
export declare class Lecture {
    title: string;
    description: string;
    domain: string;
    startDate: Date;
    endDate: Date;
    numberOfSessions: number;
    price: number;
    offer: number;
    languages: string[];
    totalPlaces: number;
    totalEnrolled: number;
    teacherId: string;
}
export declare const LectureSchema: import("mongoose").Schema<Lecture, import("mongoose").Model<Lecture, any, any, any, import("mongoose").Document<unknown, any, Lecture> & Lecture & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lecture, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Lecture>> & import("mongoose").FlatRecord<Lecture> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
