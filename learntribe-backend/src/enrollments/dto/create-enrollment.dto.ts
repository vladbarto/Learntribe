import {
  IsDate,
  IsDateString,
  IsString,
} from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  userId: string;

  @IsString()
  lectureId: string;

  @IsDateString()
  enrollmentDate: string;
}
