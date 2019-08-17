import { Routes } from '@angular/router';

import { LoginComponent } from '.';
import { SignupComponent } from '.';

export const ACCOUNT_ROUTE: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'signup',
		component: SignupComponent
	}
];