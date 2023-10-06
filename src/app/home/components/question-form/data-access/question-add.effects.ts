import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
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
    private service: QuestionsListService,
    private store: Store
  ) {}
}
