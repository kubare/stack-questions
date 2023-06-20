import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ListComponent } from './components/list/list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './components/data-access/store/questions-list.selectors';
import { QuestionsListEffects } from './components/data-access/store/questions-list.effects';

@NgModule({
  declarations: [HomeComponent, ListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature('questionsList', reducers),
    EffectsModule.forFeature([QuestionsListEffects]),
  ],
})
export class HomeModule {}
