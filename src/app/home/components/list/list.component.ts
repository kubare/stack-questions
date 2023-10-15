import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  QuestionsListLoad,
  QuestionsListQueryParams,
} from './data-access/store/questions-list.actions';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { QuestionsList } from './models/questions-list.interface';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { selectQuestions } from './data-access/store/questions-list.selectors';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { allTags } from '../../shared/models/tags.constant';
import { QuestionRemoveRequest } from '../question-remove/data-access/question-remove.actions';
import { QuestionRemoveComponent } from '../question-remove/question-remove.component';

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
    { label: '', value: 'actions' },
  ];
  columnsValues = this.columnsToDisplay.map((a) => a.value);
  expandedElement: QuestionsList | null;
  filterQuestionTitle = new UntypedFormControl('');
  filterQuestionTags = new UntypedFormControl('');
  selectedTags: string[] = [];
  allTags = allTags;
  destroy$ = new Subject();

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionsListLoad());
    this.questionsList$ = this.store.select(selectQuestions);
    this.addQuestionsToTable();

    this.filterQuestionTitle.valueChanges
      .pipe(
        tap((res) => {
          this.store.dispatch(
            QuestionsListQueryParams({ title: res, tags: [] })
          );
          if (res) this.filterQuestionTags.disable();
          else this.filterQuestionTags.enable();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.filterQuestionTags.valueChanges
      .pipe(
        tap((res) => {
          const index = this.allTags.indexOf(res);
          if (index !== -1) {
            this.allTags.splice(index, 1);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  openDialogRandomQuestion(): void {
    this.dialog.open(QuestionDialogComponent, {
      data: this.questionsList$,
      width: '900px',
    });
  }

  openDialogFormQuestion(): void {
    const dialogRef = this.dialog.open(QuestionFormComponent, {
      width: '900px',
      data: { editMode: false },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap(() => {
          this.store.dispatch(QuestionsListLoad());
        })
      )
      .subscribe();
  }

  addQuestionsToTable(): void {
    this.questionsList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((questions) => (this.dataSource = questions));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedTags.push(value);
    }
    event.chipInput!.clear();

    this.filterQuestionTags.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedTags.indexOf(fruit);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
    this.store.dispatch(
      QuestionsListQueryParams({ title: '', tags: [...this.selectedTags] })
    );

    this.allTags.unshift(fruit);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.store.dispatch(
      QuestionsListQueryParams({ title: '', tags: [...this.selectedTags] })
    );
    this.filterQuestionTags.setValue(null);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  deleteQuestion(question: QuestionsList) {
    this.dialog.open(QuestionRemoveComponent, {
      width: '900px',
      data: question,
    });
  }

  editQuestion(question: QuestionsList) {
    const dialogRef = this.dialog.open(QuestionFormComponent, {
      width: '900px',
      data: { question: question, editMode: true },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap(() => {
          this.store.dispatch(QuestionsListLoad());
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
