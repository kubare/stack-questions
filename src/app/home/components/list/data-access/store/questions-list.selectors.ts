import {
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  QuestionsListState,
  questionsListReducer,
} from './questions-list.reducer';

export const selectQuestionsListState =
  createFeatureSelector<QuestionsListState>('questionsList');

export const selectQueryParams = createSelector(
  selectQuestionsListState,
  (state: QuestionsListState) => state.params
);

export const selectQuestions = createSelector(
  selectQuestionsListState,
  selectQueryParams,
  (state: QuestionsListState) => state.list
);
