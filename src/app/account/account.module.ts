import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ACCOUNT_ROUTE } from './account.route';
import { SharedModule } from '../shared/shared.module';
import {
	LoginComponent,
} from './login/login.component';
import { LoginService } from './login/login.service';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
	imports: [
		FormsModule,
		SharedModule,
		RouterModule.forChild(ACCOUNT_ROUTE),
		BrowserAnimationsModule
	],
	providers: [
		LoginService
	],
	declarations: [
		LoginComponent,
		SignupComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
