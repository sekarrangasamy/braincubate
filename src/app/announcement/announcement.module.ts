import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule,NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  AnnouncementComponent
} from './announcement.component';
import { FilterModule } from '../common/filter';
import { ANNOUNCEMENT_ROUTE } from './announcement.route';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { ViewAnnouncementComponent } from './view-announcement/view-announcement.component';
import { SendAnnouncementComponent } from './send-announcement/send-announcement.component';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  imports: [
    RouterModule.forRoot(ANNOUNCEMENT_ROUTE),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FilterModule,
    NgbPaginationModule,
    NgbButtonsModule,
    UiSwitchModule.forRoot({
      size:'small'
    })
  ],
  declarations: [
    AnnouncementComponent,
    CreateAnnouncementComponent,
    ViewAnnouncementComponent,
    SendAnnouncementComponent
  ],
  exports: [
    AnnouncementComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[
    SendAnnouncementComponent
  ]
})
export class AnnouncementModule { }
