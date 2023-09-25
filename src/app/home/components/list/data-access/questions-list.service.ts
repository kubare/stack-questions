import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuestionsList } from '../models/questions-list.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsListService {
  constructor(private http: HttpClient) {}

  get(): Observable<QuestionsList[]> {
    return this.http.get<QuestionsList[]>('http://localhost:3000/questions');
  }
}
