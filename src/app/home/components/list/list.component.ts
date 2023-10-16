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
import { FormControl, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { QuestionFormComponent } from '../question-form/question-form.component';
import { allTags } from '../../shared/models/tags.constant';
import { QuestionRemoveComponent } from '../question-remove/question-remove.component';
import { QuestionEditRequest } from '../question-form/data-access/edit/question-edit.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  favoriteQuestion = new FormControl(false);
  selectedTags: string[] = [];
  allTags = allTags;
  destroy$ = new Subject();

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionsListLoad());
    this.questionsList$ = this.store.select(selectQuestions);
    this.addQuestionsToTable();

    this.filterQuestionTitle.valueChanges
      .pipe(
        tap((res) => {
          this.store.dispatch(
            QuestionsListQueryParams({ title: res, tags: [], favorite: false })
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
      QuestionsListQueryParams({
        title: '',
        tags: [...this.selectedTags],
        favorite: false,
      })
    );

    this.allTags.unshift(fruit);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.store.dispatch(
      QuestionsListQueryParams({
        title: '',
        tags: [...this.selectedTags],
        favorite: false,
      })
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
      data: { question, editMode: true },
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

  handleSetFavoriteQuestion(question: QuestionsList) {
    const favQuestion: QuestionsList = {
      ...question,
      favorite: !question.favorite,
    };

    this.store.dispatch(QuestionEditRequest({ payload: favQuestion }));
    this.store.dispatch(QuestionsListLoad());

    if (favQuestion.favorite) this.snackBar.open('Dodano do ulubionych!', 'Ok');
    else this.snackBar.open('Usunięto z ulubionych!', 'Ok');
  }

  displayFavsQuestions() {
    this.selectedTags = [];
    this.filterQuestionTitle.reset();

    if (this.favoriteQuestion.value) {
      this.filterQuestionTitle.disable();
      this.filterQuestionTags.disable();
    } else {
      this.filterQuestionTitle.enable();
      this.filterQuestionTags.enable();
    }

    this.store.dispatch(
      QuestionsListQueryParams({
        title: '',
        tags: [...this.selectedTags],
        favorite: this.favoriteQuestion.value ? true : false,
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
