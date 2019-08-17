import { Routes } from '@angular/router';
import { LevelsComponent } from './levels.component';
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
import { MainComponent } from '../layouts';
import { CreateLevelsComponent } from './create-levels/create-levels.component';
import { ViewScoreComponent } from './view-score/view-score.component';

export const LEVELS_ROUTE: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'levels',
                canActivate: [UserRouteAccessService],
                children: [
                    {
                        path: '',
                        component: LevelsComponent,
                    }, {
                        path: 'create-level',
                        component: CreateLevelsComponent
                    }, {
                        path: 'view-scores',
                        component: ViewScoreComponent
                    }
                ]
            }
        ]
    }
];

