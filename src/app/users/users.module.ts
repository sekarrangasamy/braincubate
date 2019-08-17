import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  UsersComponent
} from './users.component';
import { FilterModule } from '../common/filter';
import { USERS_ROUTE } from './users.route';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  imports: [
    RouterModule.forRoot(USERS_ROUTE),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FilterModule,
    NgbPaginationModule,
    TypeaheadModule.forRoot(),
    UiSwitchModule.forRoot({
      size:'small'
    })
  ],
  declarations: [
    UsersComponent,
    UserDetailsComponent
  ],
  exports: [
    UsersComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }
