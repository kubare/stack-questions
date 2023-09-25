import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuestionsListService } from '../questions-list.service';
import {
  QuestionsListFail,
  QuestionsListLoad,
  QuestionsListSuccess,
} from './questions-list.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class QuestionsListEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsListLoad),
      mergeMap(() =>
        this.service.get().pipe(
          map((list) => QuestionsListSuccess({ list })),
          catchError((error) => of(QuestionsListFail({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private service: QuestionsListService
  ) {}
}
