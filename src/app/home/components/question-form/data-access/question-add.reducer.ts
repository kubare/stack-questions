import { createReducer, on } from '@ngrx/store';

import { LoadingState } from 'src/app/home/shared/models/load-state.interface';
import {
  QuestionAddSuccess,
  QuestionAddFail,
  QuestionAddRequest,
} from './question-add.actions';

export interface QuestionAddState {
  loadState: LoadingState;
}

export const initialState: QuestionAddState = {
  loadState: LoadingState.INIT,
};

export const questionAddReducer = createReducer(
  initialState,
  on(
    QuestionAddRequest,
    (state): QuestionAddState => ({
      ...state,
      loadState: LoadingState.LOADING,
    })
  ),
  on(
    QuestionAddSuccess,
    (state): QuestionAddState => ({
      ...state,
      loadState: LoadingState.SUCCESS,
    })
  ),
  on(
    QuestionAddFail,
    (state): QuestionAddState => ({
      ...state,
      loadState: LoadingState.ERROR,
    })
  )
);
