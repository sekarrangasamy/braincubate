import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-view-score',
  templateUrl: './game-view-score.component.html',
  styleUrls: ['./game-view-score.component.scss']
})
export class GameViewScoreComponent implements OnInit {

  id: any;
  name: any;
  gameData_score: any;

  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  queryParams: any = {};
  queryCount: any;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.name = params.name;
      this.viewGameDetails(this.id);
    });
  }

  viewGameDetails(id) {
    this.gameService.getSingleGame(id).subscribe(res => {
      this.gameData_score = res.response.score;
      this.queryCount = res.response.total;
    })
  }
}
