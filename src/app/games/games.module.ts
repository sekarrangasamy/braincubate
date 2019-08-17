import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  GamesComponent
} from './games.component';
import { FilterModule } from '../common/filter';
import { GAMES_ROUTE } from './games.route';
import { CreateGamesComponent } from './create-games/create-games.component';
import { GameViewScoreComponent } from './game-view-score/game-view-score.component';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    RouterModule.forRoot(GAMES_ROUTE),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FilterModule,
    NgbPaginationModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [
    GamesComponent,
    CreateGamesComponent,
    GameViewScoreComponent
  ],
  exports: [
    GamesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamesModule { }
