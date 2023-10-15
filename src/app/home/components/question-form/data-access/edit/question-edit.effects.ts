import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { QuestionsListService } from '../../../list/data-access/questions-list.service';
import {
  QuestionEditFail,
  QuestionEditRequest,
  QuestionEditSuccess,
} from './question-edit.actions';

@Injectable()
export class QuestionEditEffects {
  editQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionEditRequest),
      switchMap((res) => {
        return this.service.edit(res.payload).pipe(
          map((question) => QuestionEditSuccess({ question })),
          catchError((error) => of(QuestionEditFail({ error })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private service: QuestionsListService
  ) {}
}
