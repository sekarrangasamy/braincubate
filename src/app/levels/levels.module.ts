import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  LevelsComponent
} from './levels.component';
import { FilterModule } from '../common/filter';
import { LEVELS_ROUTE } from './levels.route';
import { CreateLevelsComponent } from './create-levels/create-levels.component';
import { ViewScoreComponent } from './view-score/view-score.component';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  imports: [
    RouterModule.forRoot(LEVELS_ROUTE),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FilterModule,
    NgbPaginationModule,
    ColorPickerModule

  ],
  declarations: [
    LevelsComponent,
    CreateLevelsComponent,
    ViewScoreComponent
  ],
  exports: [
    LevelsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LevelsModule { }
