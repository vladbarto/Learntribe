import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  constructor(private http: HttpClient) {}

  chat(message: string) {
    return this.http.post<{ response: string }>(`${environment.endpoint.CHATBOT}`, { message });
  }
}
