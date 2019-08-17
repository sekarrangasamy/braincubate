import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
	DashboardComponent
} from './dashboard.component';
import { FilterModule } from '../common/filter';
import { DASHBOARD_ROUTE } from './dashboard.route';

@NgModule({
	imports: [
		RouterModule.forRoot(DASHBOARD_ROUTE),
		BsDatepickerModule.forRoot(),
		DatepickerModule.forRoot(),
		NgMultiSelectDropDownModule.forRoot(),
		BrowserModule,
		ReactiveFormsModule,
		FormsModule,
		FilterModule
	],
	declarations: [
		DashboardComponent
	],
	exports: [
		DashboardComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }