import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { QuestionsList } from '../list/models/questions-list.interface';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss'],
})
export class QuestionDialogComponent implements OnInit, OnDestroy {
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;
  singleRandQuestion: QuestionsList | null = null;
  panelOpenState = false;
  showSpinner = false;
  destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Observable<QuestionsList[]>
  ) {}

  ngOnInit(): void {
    this.data
      .pipe(
        tap((res) => {
          if (res.length)
            this.singleRandQuestion =
              res[Math.floor(Math.random() * res.length)];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getRandomQuestion() {
    this.data
      .pipe(
        tap((res) => {
          if (res.length)
            this.singleRandQuestion =
              res[Math.floor(Math.random() * res.length)];
        })
      )
      .subscribe();

    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 750);

    if (this.expansionPanel) this.expansionPanel.close();
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
