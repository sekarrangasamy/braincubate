import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../announcement.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Config } from 'src/app/config/config';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.scss']
})
export class ViewAnnouncementComponent implements OnInit {

  announcementId: string;
  announcementTitle: string;
  announcementType: string;
  announcementDesc: string;
  announcementCreatedOn: Date;
  announcementUpdatedOn: Date;
  announcementIcon: string;
  announcementScrollVisible:any;
  notificationsData: [];
  length: number;
  page: number = 1;
  limit: number = 5;
  offset: number = 0;
  queryParams : {} = {};

  textLimit:any= Config.maxChars;

  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private toastr: ToastrManager
  ) { 
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.announcementId = params.id;
    });

    this.announcementService.getParticularAnnouncement(this.announcementId).subscribe(result => {
      this.announcementTitle = result.response.title;
      this.announcementDesc = result.response.desc;
      this.announcementType = result.response.type;
      this.announcementCreatedOn = result.response.created_at;
      this.announcementUpdatedOn = result.response.last_updated_at;
      this.announcementIcon = result.response.icon;
    });

    this.queryParams = {
      'offset'  : this.offset,
      'limit'   : this.limit,
      'announcement': this.announcementId
    }
    this.getSentHistory();
  }

  sendAnnouncement() {
    this.announcementService.putAnnouncement(this.announcementId).subscribe(result => {
      if (result) {
        if (result.meta.status == 200) {
          this.toastr.successToastr(result.meta.msg);
        } else {
          this.toastr.warningToastr(result.meta.msg);
        }
      } else {
        console.log("Response may be null");
      }
    })
  }

  getSentHistory() {
    this.announcementService.getNotifications(this.queryParams).subscribe(result => {
      this.notificationsData = result.response.notifications;
      this.length = result.response.total;
      if(this.notificationsData.length > 5){
        this.announcementScrollVisible = true;
      }
    });
  }

  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    this.queryParams["offset"] = this.offset;
    this.getSentHistory();
  }

}
