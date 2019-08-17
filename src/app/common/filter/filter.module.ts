import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
	FilterComponent
} from './filter.component';
import { FILTER_ROUTE } from './filter.route';

@NgModule({
	imports: [
		RouterModule.forRoot(FILTER_ROUTE),
		BsDatepickerModule.forRoot(),
		DatepickerModule.forRoot(),
		NgMultiSelectDropDownModule.forRoot(),
		BrowserModule,
		ReactiveFormsModule,
		FormsModule
	],
	declarations: [
		FilterComponent
	],
	exports: [FilterComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilterModule { }