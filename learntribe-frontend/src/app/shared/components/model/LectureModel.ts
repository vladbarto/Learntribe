export interface LectureModel {
  _id?: string,
  title: string,
  description: string,
  domain: string,
  startDate: Date,
  endDate: Date,
  price: number,
  offer: number,
  languages: String[],
  totalPlaces: number,
  totalEnrolled: number,
  numberOfSessions: number,
  isAvailable?: boolean,
  teacherId?: string
}
