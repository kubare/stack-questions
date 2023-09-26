import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuestionsList } from '../models/questions-list.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsListService {
  constructor(private http: HttpClient) {}

  get(title?: string): Observable<QuestionsList[]> {
    let params = new HttpParams();
    if (title) params = params.set('title_like', title);
    return this.http.get<QuestionsList[]>(`http://localhost:3000/questions`, {
      params,
    });
  }
}
