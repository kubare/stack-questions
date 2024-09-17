import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { QuestionsListService } from '../questions-list.service';
import {
  QuestionsListFail,
  QuestionsListLoad,
  QuestionsListQueryParams,
  QuestionsListSuccess,
} from './questions-list.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectQueryParams } from './questions-list.selectors';

@Injectable()
export class QuestionsListEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsListLoad, QuestionsListQueryParams),
      concatLatestFrom(() => this.store.select(selectQueryParams)),
      switchMap(([, res]) => {
        return this.service.get(res).pipe(
          map((list) => QuestionsListSuccess({ list })),
          catchError((error) => of(QuestionsListFail({ error })))
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
