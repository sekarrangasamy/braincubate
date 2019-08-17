import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  SettingsComponent
} from './settings.component';
import { FilterModule } from '../common/filter';
import { SETTINGS_ROUTE } from './settings.route';

@NgModule({
  imports: [
    RouterModule.forRoot(SETTINGS_ROUTE),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FilterModule
  ],
  declarations: [
    SettingsComponent
  ],
  exports: [
    SettingsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
