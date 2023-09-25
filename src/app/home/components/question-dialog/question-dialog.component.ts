import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionsList } from '../list/models/questions-list.interface';
import { MatExpansionPanel } from '@angular/material/expansion';
import { tap, timer } from 'rxjs';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss'],
})
export class QuestionDialogComponent implements OnInit {
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;
  singleRandQuestion: QuestionsList | null =
    this.data[Math.floor(Math.random() * this.data.length)];
  panelOpenState = false;
  showSpinner = false;

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionsList[]
  ) {}

  ngOnInit(): void {}

  getRandomQuestion() {
    this.singleRandQuestion =
      this.data[Math.floor(Math.random() * this.data.length)];

    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 750);

    if (this.expansionPanel) this.expansionPanel.close();
  }

  handleCancel(): void {
    this.dialogRef.close();
  }
}
