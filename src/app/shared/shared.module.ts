import { NgModule } from '@angular/core';

import {
	SharedCommonModule,
	SharedLibsModule
} from './';

import { UserRouteAccessService } from './auth/user-route-access-service';

import {
	Principal,
	AccountService,
	AuthServerProvider
} from './';

@NgModule({
	imports: [
		SharedCommonModule
	],
	providers: [
		Principal,
		AccountService,
		AuthServerProvider,
		UserRouteAccessService
	],
	exports: [
		SharedCommonModule
	],
	declarations: []
})
export class SharedModule { }
