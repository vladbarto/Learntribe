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

    return this.http.get<LectureModel[]>(`${this.endpoint.LECTURE}/all`, { params });
  }

  public getLectureById(id: string): Observable<LectureModel> {
    return this.http.get<LectureModel>(`${this.endpoint.LECTURE}/${id}`);
  }
}
