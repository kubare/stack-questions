import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { QuestionsListService } from '../../list/data-access/questions-list.service';
import {
  QuestionAddFail,
  QuestionAddRequest,
  QuestionAddSuccess,
} from './question-add.actions';

@Injectable()
export class QuestionAddEffects {
  addQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionAddRequest),
      switchMap((res) => {
        return this.service.add(res.payload).pipe(
          map((question) => QuestionAddSuccess({ question })),
          catchError((error) => of(QuestionAddFail({ error })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private service: QuestionsListService
  ) {}
}
