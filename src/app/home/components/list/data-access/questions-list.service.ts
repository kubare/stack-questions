import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuestionsList } from '../models/questions-list.interface';
import { FiltersParams } from '../models/filters-params.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsListService {
  constructor(private http: HttpClient) {}

  get(queryParams?: FiltersParams | null): Observable<QuestionsList[]> {
    let queryString = '?';
    if (queryParams?.title) {
      queryString += `title_like=${queryParams.title}&`;
    }

    if (queryParams?.tags && queryParams.tags.length > 0) {
      queryParams.tags.forEach((tag) => {
        queryString += `tags=${tag}&`;
      });
    }
    queryString = queryString.slice(0, -1);

    return this.http.get<QuestionsList[]>(
      `http://localhost:3000/questions${queryString}`
    );
  }

  add(question?: QuestionsList): Observable<QuestionsList> {
    return this.http.post<QuestionsList>(
      'http://localhost:3000/questions',
      question
    );
  }
}
