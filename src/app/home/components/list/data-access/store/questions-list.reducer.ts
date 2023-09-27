import { HttpErrorResponse } from '@angular/common/http';
import { QuestionsList } from '../../models/questions-list.interface';
import { createReducer, on } from '@ngrx/store';
import {
  QuestionsListFail,
  QuestionsListLoad,
  QuestionsListSuccess,
  QuestionsListQueryParams,
} from './questions-list.actions';
import { LoadingState } from 'src/app/home/shared/models/load-state.interface';
import { FiltersParams } from '../../models/filters-params.interface';

export interface QuestionsListState {
  list: QuestionsList[];
  params: FiltersParams | null;
  loadState: LoadingState;
  error: HttpErrorResponse | null;
}

export const initialState: QuestionsListState = {
  list: [],
  params: null,
  loadState: LoadingState.INIT,
  error: null,
};

export const questionsListReducer = createReducer(
  initialState,
  on(
    QuestionsListLoad,
    (state): QuestionsListState => ({
      ...state,
      loadState: LoadingState.LOADING,
      error: null,
    })
  ),
  on(
    QuestionsListSuccess,
    (state, action): QuestionsListState => ({
      ...state,
      list: action.list,
      loadState: LoadingState.SUCCESS,
      error: null,
    })
  ),
  on(
    QuestionsListQueryParams,
    (state, action): QuestionsListState => ({
      ...state,
      params: { title: action.title, tags: action.tags },
      loadState: LoadingState.SUCCESS,
      error: null,
    })
  ),
  on(
    QuestionsListFail,
    (state, { error }): QuestionsListState => ({
      ...state,
      loadState: LoadingState.ERROR,
      error,
    })
  )
);
