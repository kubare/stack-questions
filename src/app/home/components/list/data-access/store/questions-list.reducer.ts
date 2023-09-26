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

export interface QuestionsListState {
  list: QuestionsList[];
  filter: string;
  loadState: LoadingState;
  error: HttpErrorResponse | null;
}

export const initialState: QuestionsListState = {
  list: [],
  filter: '',
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
      filter: action.filter,
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
