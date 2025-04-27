// src/lectures/schemas/lecture.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LectureDocument = HydratedDocument<Lecture>;

@Schema({ timestamps: true })
export class Lecture {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, min: 1 })
  numberOfSessions: number;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0 })
  offer: number;

  @Prop({ type: [String], required: true })
  languages: string[];

  @Prop({ required: true, min: 0 })
  totalPlaces: number;

  @Prop({ required: false, min: 0, default: 0})
  totalEnrolled: number;

  @Prop()
  teacherId: string;
}

export const LectureSchema = SchemaFactory.createForClass(Lecture);
