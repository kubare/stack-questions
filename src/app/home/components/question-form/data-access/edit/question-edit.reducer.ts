import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'src/app/home/shared/models/load-state.interface';
import {
  QuestionEditFail,
  QuestionEditRequest,
  QuestionEditSuccess,
} from './question-edit.actions';

export interface QuestionEditState {
  loadState: LoadingState;
}

export const initialState: QuestionEditState = {
  loadState: LoadingState.INIT,
};

export const questionEditReducer = createReducer(
  initialState,
  on(
    QuestionEditRequest,
    (state): QuestionEditState => ({
      ...state,
      loadState: LoadingState.LOADING,
    })
  ),
  on(
    QuestionEditSuccess,
    (state): QuestionEditState => ({
      ...state,
      loadState: LoadingState.SUCCESS,
    })
  ),
  on(
    QuestionEditFail,
    (state): QuestionEditState => ({
      ...state,
      loadState: LoadingState.ERROR,
    })
  )
);
