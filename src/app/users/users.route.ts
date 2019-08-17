import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
import { MainComponent } from '../layouts';
import { UserDetailsComponent } from './user-details/user-details.component';

export const USERS_ROUTE: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'users',
                canActivate: [UserRouteAccessService],
                children: [
                    {
                        path: '',
                        component: UsersComponent
                    }, {
                        path: 'view-users',
                        component: UserDetailsComponent
                    }
                ]

                

            }
        ]
    }
];

