import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LevelsService } from '../levels.service';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.component.html',
  styleUrls: ['./view-score.component.scss']
})
export class ViewScoreComponent implements OnInit {

  id: any;
  name: any;
  levelData_score: any;

  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  queryParams: any = {};
  queryCount: any;

  constructor(
    private route: ActivatedRoute,
    private levelService: LevelsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.name = params.name;
      this.viewLevelDetails(this.id);
    });
  }

  viewLevelDetails(id) {
    this.levelService.getSingleLevel(id).subscribe(res => {
      this.levelData_score = res.response.required_score;
      this.queryCount = res.response.total;
    })
  }
}
