import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionAddRequest } from './data-access/question-add.actions';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { allTags } from '../../shared/models/tags.constant';
import { MatDialogRef } from '@angular/material/dialog';
import { QuestionsList } from '../list/models/questions-list.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent {
  questionForm = this.fb.group({
    id: this.fb.control(''),
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    answer: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(750)],
    ],
    subpoints: this.fb.array([this.fb.control('')]),
    tags: this.fb.control('', [Validators.required]),
    image: this.fb.control(null),
  });
  allTags = allTags;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuestionFormComponent>,
    private snackBar: MatSnackBar
  ) {}

  get subpoints() {
    return this.questionForm.get('subpoints') as FormArray;
  }

  addSubPoint() {
    this.subpoints.push(this.fb.control(''));
  }

  removeSubPoint(index: number) {
    this.subpoints.controls.splice(index, 1);
  }

  submitForm() {
    const payload: any = {
      ...this.questionForm.value,
      id: uuid(),
    };

    this.store.dispatch(QuestionAddRequest({ payload }));

    this.dialogRef.close();
    this.snackBar.open('Dodano pytanie!', 'Ok');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
