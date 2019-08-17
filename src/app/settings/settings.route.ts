import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
import { MainComponent } from '../layouts';

export const SETTINGS_ROUTE: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];

