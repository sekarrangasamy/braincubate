import { Route } from '@angular/router';
import {
	NavbarComponent
} from './layouts/navbar/navbar.component';
import { TopHeaderComponent } from './layouts/top-header/top-header.component';

export const navbarRoute: Route = {
	path: '',
	component: NavbarComponent,
	outlet: 'navbar'
};

export const topheaderRoute: Route = {
	path: '',
	component: TopHeaderComponent,
	outlet: 'top-header'
};