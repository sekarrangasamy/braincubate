import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
import { MainComponent } from '../layouts';

export const DASHBOARD_ROUTE: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
				canActivate: [UserRouteAccessService]
			}
		]
	}
];

