import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';

import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import { AppLayoutRoutingModule } from './layouts/layout-routing.module';
import { AccountModule } from './account/account.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FilterModule } from './common/filter/filter.module';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DashboardService } from './dashboard/dashboard.service';
import { FilterService } from './common/filter/filter.service';
import { LayoutService } from './layouts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
	MainComponent,
	NavbarComponent,
	TopHeaderComponent,
	FooterComponent,
	ErrorComponent
} from './layouts';
import { UsersModule } from './users';
import { LevelsModule } from './levels';
import { GamesModule } from './games';
import { AnnouncementModule } from './announcement';
import { AchievementsModule } from './achievements';
import { SettingsModule } from './settings';

@NgModule({
	declarations: [
		AppComponent,
		ErrorComponent,
		FooterComponent,
		MainComponent,
		NavbarComponent,
		TopHeaderComponent,
	],
	imports: [
		BrowserModule,
		SharedModule,
		AccountModule,
		FilterModule,
		DashboardModule,
		ReactiveFormsModule,
		FormsModule,
		AppLayoutRoutingModule,
		NgbModule.forRoot(),
		BsDatepickerModule.forRoot(),
		DatepickerModule.forRoot(),
		NgxSpinnerModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(), // ToastrModule added

		UsersModule,
		LevelsModule,
		GamesModule,
		AnnouncementModule,
		AchievementsModule,
		SettingsModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		DashboardService,
		FilterService,
		LayoutService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
