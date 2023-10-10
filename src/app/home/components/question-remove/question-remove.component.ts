import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionsList } from '../list/models/questions-list.interface';
import { QuestionsListLoad } from '../list/data-access/store/questions-list.actions';
import { Store } from '@ngrx/store';
import { QuestionRemoveRequest } from './data-access/question-remove.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-remove',
  templateUrl: './question-remove.component.html',
  styleUrls: ['./question-remove.component.scss'],
})
export class QuestionRemoveComponent {
  constructor(
    public dialogRef: MatDialogRef<QuestionRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionsList,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  deleteQuestion(id: string) {
    this.store.dispatch(QuestionRemoveRequest({ id }));
    this.dialogRef.close();
    this.snackBar.open('Usunięto pytanie!', 'Ok');
    this.store.dispatch(QuestionsListLoad());
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
