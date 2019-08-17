import { Routes } from '@angular/router';
import { AchievementsComponent } from './achievements.component';
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
import { MainComponent } from '../layouts';

export const ACHIEVEMENT_ROUTE: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'achievement',
                component: AchievementsComponent,
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];

