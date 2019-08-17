import { NgModule } from '@angular/core';

import { SharedLibsModule } from './';

@NgModule({
	imports: [
		SharedLibsModule
	],
	exports: [
		SharedLibsModule
	],
	declarations: []
})
export class SharedCommonModule { }
