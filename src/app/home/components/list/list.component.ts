import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuestionsList } from '../data-access/store/questions-list.selectors';
import { QuestionsListLoad } from '../data-access/store/questions-list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  questionsList$ = this.store.select(selectQuestionsList);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(QuestionsListLoad());
    this.questionsList$.subscribe((res) => console.log(res));
    console.log(this.questionsList$);
  }
}
