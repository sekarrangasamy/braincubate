import { Routes } from '@angular/router';
import { AnnouncementComponent } from './announcement.component';
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
import { MainComponent } from '../layouts';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { ViewAnnouncementComponent } from './view-announcement/view-announcement.component';

export const ANNOUNCEMENT_ROUTE: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'announcement',
                canActivate: [UserRouteAccessService],
                children: [
                    {
                        path: '',
                        component: AnnouncementComponent
                    }, {
                        path: 'create-announcement',
                        component: CreateAnnouncementComponent
                    }, {
                        path: 'view-announcement',
                        component: ViewAnnouncementComponent
                    }
                ]
                
            }
        ]
    }
];
