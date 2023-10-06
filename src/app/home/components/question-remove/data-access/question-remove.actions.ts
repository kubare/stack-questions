import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { QuestionsList } from '../../list/models/questions-list.interface';

const questionRemove = {
  request: '[Questions Remove] Request',
  requestSuccess: '[Questions Remove] Success',
  requestFail: '[Questions Remove] Fail',
};

export const QuestionRemoveRequest = createAction(
  questionRemove.request,
  props<{ id: string }>()
);

export const QuestionRemoveSuccess = createAction(
  questionRemove.requestSuccess
);

export const QuestionRemoveFail = createAction(
  questionRemove.requestFail,
  props<{ error: HttpErrorResponse }>()
);
