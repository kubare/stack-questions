import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { QuestionsListService } from '../../list/data-access/questions-list.service';
import {
  QuestionRemoveFail,
  QuestionRemoveRequest,
  QuestionRemoveSuccess,
} from './question-remove.actions';

@Injectable()
export class QuestionRemoveEffects {
  removeQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionRemoveRequest),
      switchMap((res) => {
        return this.service.delete(res.id).pipe(
          map(() => QuestionRemoveSuccess()),
          catchError((error) => of(QuestionRemoveFail({ error })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private service: QuestionsListService
  ) {}
}
