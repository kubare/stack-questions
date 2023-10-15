import { QuestionsList } from '../../list/models/questions-list.interface';

export interface QuestionEditMode {
  question?: QuestionsList;
  editMode: boolean;
}
