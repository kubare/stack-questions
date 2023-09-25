import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionsListLoad } from './data-access/store/questions-list.actions';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { QuestionsList } from './models/questions-list.interface';
import { Observable, Subject, takeUntil, tap, toArray } from 'rxjs';
import { selectQuestions } from './data-access/store/questions-list.selectors';
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListComponent {
  questionsList$: Observable<QuestionsList[]>;
  dataSource: QuestionsList[];
  columnsToDisplay = [
    { label: 'Nazwa pytania', value: 'title' },
    { label: 'Tagi', value: 'tags' },
  ];
  columnsValues = this.columnsToDisplay.map((a) => a.value);
  expandedElement: QuestionsList | null;
  destroy$ = new Subject();

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionsListLoad());
    this.questionsList$ = this.store.select(selectQuestions);
    this.addQuestionsToTable();
  }

  openDialog(): void {
    this.questionsList$
      .pipe(
        tap((questions) => {
          this.dialog.open(QuestionDialogComponent, {
            data: questions,
            width: '900px',
          });
        })
      )
      .subscribe();
  }

  addQuestionsToTable(): void {
    this.questionsList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((questions) => (this.dataSource = questions));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
