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

export const selectQuestions = createSelector(
  selectQuestionsListState,
  (state: QuestionsListState) => state.list
);
