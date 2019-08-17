import { Routes } from '@angular/router';
import { GamesComponent } from './games.component';
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
import { MainComponent } from '../layouts';
import { CreateGamesComponent } from './create-games/create-games.component';
import { GameViewScoreComponent } from './game-view-score/game-view-score.component';

export const GAMES_ROUTE: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'games',
                canActivate: [UserRouteAccessService],
                children: [
                    {
                        path: '',
                        component: GamesComponent,
                    }, {
                        path: 'create-game',
                        component: CreateGamesComponent
                    }, {
                        path: 'view-score',
                        component: GameViewScoreComponent
                    }
                ]
            }
        ]
    }
];
