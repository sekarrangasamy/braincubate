import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/filter";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id: any;
  name: any;
  connectedFriends: any;
  connectedFrnds:any=[];
  achievementData: any;
  currentGames: any;
  levelData: any;
  userData: any;

  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  queryParams: any = {};
  queryCount: any;
  flag: any;
  scorllVisisble: any;
  scorllVisisble1: any;
  message: any;
  message1: any;

  noConnectedFreinds: any;
  noAchieveemnts: any;


  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.name = params.name;
      this.viewUserDetails(this.id);
    });
  }


  viewUserDetails(id) {
    this.userService.getSingleUser(id).subscribe(res => {
      this.userData = res.response; 
     
      if (this.userData.country) {
        this.flag = this.userData.country.alpha_2
      }



      if (res.response.connected_friends.length == 0) {
        this.noConnectedFreinds = true;
        this.message = "No Friends To Show"
      } else {
        this.noConnectedFreinds = false;
        this.connectedFriends = res.response.connected_friends;
      this.connectedFriends.forEach(element => {
        this.connectedFrnds.push(element.user);
      });
        if (this.connectedFrnds.length > 5) {
          this.scorllVisisble1 = true
        }
      }

      if (res.response.achievements.length == 0) {
        this.noAchieveemnts = true;
        this.message1 = "No Achievements To Show"
      } else {
        this.noAchieveemnts = false;
        this.achievementData = res.response.achievements;
        if (this.achievementData.length > 6) {
          this.scorllVisisble = true
        }
      }


      this.currentGames = res.response.current_game;
      this.levelData = res.response.level;
      this.queryCount = res.response;
    })
  }
}
