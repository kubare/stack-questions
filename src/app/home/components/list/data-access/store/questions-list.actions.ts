import { createAction, props } from '@ngrx/store';
import { QuestionsList } from '../../models/questions-list.interface';
import { HttpErrorResponse } from '@angular/common/http';

const questionsList = {
  request: '[Questions List] Load',
  requestSuccess: '[Questions List] Success',
  requestQueryParams: '[Questions List] Change query params',
  requestFail: '[Questions List] Fail',
};

export const QuestionsListLoad = createAction(questionsList.request);

export const QuestionsListSuccess = createAction(
  questionsList.requestSuccess,
  props<{ list: QuestionsList[] }>()
);

export const QuestionsListQueryParams = createAction(
  questionsList.requestQueryParams,
  props<{ filter: string }>()
);

export const QuestionsListFail = createAction(
  questionsList.requestFail,
  props<{ error: HttpErrorResponse }>()
);
