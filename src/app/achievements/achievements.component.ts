import { Component, OnInit } from '@angular/core';
import { AchievementsService } from './achievements.service';
import { NgbModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { CreateAchievementsComponent } from './create-achievements/create-achievements.component';
import { UpdateAchievementsComponent } from './update-achievements/update-achievements.component';
import { DeleteAchievementsComponent } from './delete-achievements/delete-achievements.component';
@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  achievementData: any;
  textValue: any;
  textLimit:any=50;
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  queryParams: any = {};
  queryCount: any;
  togglePaginate: any;
  showShortDesciption = true;
  noResults:boolean;
  errorMsg:any;


  constructor(
    private achievementService: AchievementsService,
    private modalService: NgbModal
  ) {
    this.queryParams = {
      offset: this.offset,
      limit: this.limit
    }
  

  }

  ngOnInit() {
    this.achievement();
  }

  readMore(length,textlimit,id){
    if(id._id){
      this.showShortDesciption = !this.showShortDesciption;
      if(this.showShortDesciption==true){
        this.textLimit=50;
      }else{
      this.textLimit=length;
    }
    
  }
    // this.showShortDesciption = !this.showShortDesciption;
    // console.log("length",length);
    // this.textLimit=length;
  }
  achievement() {
    this.achievementService.getAchievement(this.queryParams).subscribe(res => {
      this.achievementData = res.response.achievements;
      this.queryCount = res.response.total;
      if(this.queryCount == 0){
        this.noResults=true;
        this.errorMsg="Data not available";
      }
    })
    this.togglePaginate = true;
  }

  search() {
    if (this.textValue != "") {
      this.achievementService
        .filterAchievementData(this.textValue, this.queryParams).subscribe((res: any) => {
          this.achievementData = res.response.achievements;
          this.queryCount = res.response.total;
        });
      this.togglePaginate = false;
      this.noResults=true;
      this.errorMsg="Sorry, We couldn't find any results";

    } else {
      this.achievement();
    }
  }

  loadPage(page) {
    this.queryParams['offset'] = (page - 1) * this.limit;
    this.achievement();
  }

  searchPage(page) {
    this.queryParams['offset'] = (page - 1) * this.limit;
    this.achievementService.searchPagination(this.textValue, this.queryParams).subscribe((res: any) => {
      this.achievementData = res.response.Achievements;
    });
  }

  createModal() {
    const modalRef = this.modalService.open(CreateAchievementsComponent, {
      size: 'lg',
      centered: true,
      backdrop:'static',
      keyboard:false
    })
    modalRef.componentInstance.reload.subscribe($e => {
      this.achievement();
    })
  }

  updateModal(e) {
    const modalRef = this.modalService.open(UpdateAchievementsComponent, {
      size: 'lg',
      centered: true,
      backdrop:'static',
      keyboard:false
    })
    modalRef.componentInstance.id = e._id;
    modalRef.componentInstance.name = e.name;
    modalRef.componentInstance.desc = e.desc;
    modalRef.componentInstance.icon=e.icon;
    modalRef.componentInstance.reload.subscribe($e => {
      this.achievement();
    })
  }

  deleteModal(e) {
    const modalRef = this.modalService.open(DeleteAchievementsComponent, {
      size: 'sm',
      centered: true,
      backdrop:'static',
      keyboard:false
    });
    modalRef.componentInstance.id = e._id;
    modalRef.componentInstance.reload.subscribe($e => {
      this.achievement();
    })
  }
}
