import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionsList } from '../../../list/models/questions-list.interface';

const questionEdit = {
  request: '[Questions Edit] Request',
  requestSuccess: '[Questions Edit] Success',
  requestFail: '[Questions Edit] Fail',
};

export const QuestionEditRequest = createAction(
  questionEdit.request,
  props<{ payload: QuestionsList }>()
);

export const QuestionEditSuccess = createAction(
  questionEdit.requestSuccess,
  props<{ question: QuestionsList }>()
);

export const QuestionEditFail = createAction(
  questionEdit.requestFail,
  props<{ error: HttpErrorResponse }>()
);
