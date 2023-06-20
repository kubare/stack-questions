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

export interface QuestionsListStateReducers {
  questionsList: QuestionsListState;
}

export const reducers = combineReducers<QuestionsListStateReducers>({
  questionsList: questionsListReducer,
});

export const selectQuestionsList = createSelector(
  selectQuestionsListState,
  (state) => state?.list
);
