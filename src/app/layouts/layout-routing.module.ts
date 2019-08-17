import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { navbarRoute, topheaderRoute } from '../app.route';
import { errorRoute } from './error/error.route';

const LAYOUT_ROUTES = [
	navbarRoute,
	topheaderRoute,
	...errorRoute
];

@NgModule({
	imports: [
		RouterModule.forRoot(LAYOUT_ROUTES)
	],
	exports: [
		RouterModule
	]
})

export class AppLayoutRoutingModule { }