import { Document } from 'mongoose';
export type EnrollmentDocument = Enrollment & Document;
export declare class Enrollment {
    lectureId: string;
    userId: string;
    enrollmentDate: Date;
}
export declare const EnrollmentSchema: import("mongoose").Schema<Enrollment, import("mongoose").Model<Enrollment, any, any, any, Document<unknown, any, Enrollment> & Enrollment & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Enrollment, Document<unknown, {}, import("mongoose").FlatRecord<Enrollment>> & import("mongoose").FlatRecord<Enrollment> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
