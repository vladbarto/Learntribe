import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentsService {
    private enrollmentModel;
    constructor(enrollmentModel: Model<EnrollmentDocument>);
    findEnrollmentByLectureId(lectureId: string): Promise<Enrollment[]>;
    enroll(request: CreateEnrollmentDto): Promise<Enrollment>;
    alreadyEnrolled(userId: string, lectureId: string): Promise<boolean>;
}
