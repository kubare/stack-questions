import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionsList } from '../../list/models/questions-list.interface';

const questionAdd = {
  request: '[Questions Add] Request',
  requestSuccess: '[Questions Add] Success',
  requestFail: '[Questions Add] Fail',
};

export const QuestionAddRequest = createAction(
  questionAdd.request,
  props<{ payload: QuestionsList }>()
);

export const QuestionAddSuccess = createAction(
  questionAdd.requestSuccess,
  props<{ question: QuestionsList }>()
);

export const QuestionAddFail = createAction(
  questionAdd.requestFail,
  props<{ error: HttpErrorResponse }>()
);
