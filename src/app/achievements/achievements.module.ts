import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule,NgbActiveModal,NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  AchievementsComponent
} from './achievements.component';
import { FilterModule } from '../common/filter';
import { ACHIEVEMENT_ROUTE } from './achievements.route';
import { CreateAchievementsComponent } from './create-achievements/create-achievements.component';
import { UpdateAchievementsComponent } from './update-achievements/update-achievements.component';
import { DeleteAchievementsComponent } from './delete-achievements/delete-achievements.component';

@NgModule({
  imports: [
    RouterModule.forRoot(ACHIEVEMENT_ROUTE),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FilterModule,
    NgbPaginationModule
  ],
  declarations: [
    AchievementsComponent,
    CreateAchievementsComponent,
    UpdateAchievementsComponent,
    DeleteAchievementsComponent,
  ],
  exports: [
    AchievementsComponent,
    CreateAchievementsComponent,
    UpdateAchievementsComponent,
    DeleteAchievementsComponent
  ],
  providers:[
    NgbActiveModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[
    CreateAchievementsComponent,
    UpdateAchievementsComponent,
    DeleteAchievementsComponent

  ]
})
export class AchievementsModule { }
