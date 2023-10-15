import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionAddRequest } from './data-access/add/question-add.actions';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { allTags } from '../../shared/models/tags.constant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionsList } from '../list/models/questions-list.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuid } from 'uuid';
import { QuestionEditRequest } from './data-access/edit/question-edit.actions';
import { QuestionEditMode } from './models/question-edit.interface';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  questionForm = this.fb.group({
    id: this.fb.control('') as FormControl<string>,
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
    image: this.fb.control(null) as FormControl<string | null>,
  });
  allTags = allTags;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuestionFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: QuestionEditMode
  ) {}

  ngOnInit(): void {
    if (this.data.editMode && this.data.question) {
      if (this.data.question.subpoints) {
        this.data.question.subpoints.forEach((res) => this.addSubPoint(res));
        this.subpoints.removeAt(0);
      }
      const { subpoints: _, ...question } = this.data.question;

      this.questionForm.patchValue(question);
    }
  }

  get subpoints() {
    return this.questionForm.get('subpoints') as FormArray;
  }

  addSubPoint(subpoint?: string | null) {
    if (subpoint) this.subpoints.push(this.fb.control(subpoint));
    else this.subpoints.push(this.fb.control(''));
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

  editQuestion() {
    const payload: any = {
      ...this.questionForm.value,
      id: this.questionForm.value.id,
    };

    this.store.dispatch(QuestionEditRequest({ payload }));

    this.dialogRef.close();
    this.snackBar.open('Edytowano pytanie!', 'Ok');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
