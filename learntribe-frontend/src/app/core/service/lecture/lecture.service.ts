import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LectureModel} from '../../../shared/components/model/LectureModel';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private endpoint = environment.endpoint;
  private apiUrl = this.endpoint.LECTURE.base;

  constructor(private http: HttpClient) { }

  public getAll(filters?: any): Observable<LectureModel[]> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (Array.isArray(value)) {
          value.forEach(item => {
            params = params.append(key, item);
          });
        } else if (value !== null && value !== undefined) {
          params = params.append(key, value);
        }
      });
    }

    return this.http.get<LectureModel[]>(`${this.endpoint.LECTURE.base}/all`, { params });
  }

  public getLectureById(id: string): Observable<LectureModel> {
    return this.http.get<LectureModel>(`${this.endpoint.LECTURE.base}/${id}`);
  }

  public incrementLectureTotalEnrolled(id: string): Observable<LectureModel> {
    return this.http.patch<LectureModel>(`${this.endpoint.LECTURE.base}/${this.endpoint.LECTURE.increment}/${id}`, {});
  }

  getLecturesByTeacher(teacherId: string): Observable<any> {
    return this.http.get(`${this.endpoint.LECTURE.base}/${this.endpoint.LECTURE.teacher}/${teacherId}`);
  }

  createLecture(courseData: any): Observable<any> {
    console.log(courseData);
    return this.http.post(`${this.apiUrl}/${this.endpoint.LECTURE.one}`, courseData);
  }

  updateLecture(courseId: string, courseData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${courseId}`, courseData);
  }

  deleteLecture(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }
}
