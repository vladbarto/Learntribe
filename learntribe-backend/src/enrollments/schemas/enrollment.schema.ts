// src/enrollments/schemas/enrollment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

@Schema()
export class Enrollment {
  @Prop({ required: true })
  lectureId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: () => new Date() })
  enrollmentDate: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
