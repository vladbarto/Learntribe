import { EnrollmentsService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    enroll(body: CreateEnrollmentDto): Promise<import("./schemas/enrollment.schema").Enrollment>;
    alreadyEnrolled(lectureId: string, userId: string): Promise<boolean>;
}
