import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from './announcement.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Config } from '../config/config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {SendAnnouncementComponent} from './send-announcement/send-announcement.component';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  
  announcementForm:FormGroup;
  announcementData: any;
  textValue: any;
  textLimit:any=Config.maxChars;
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  queryParams: any = {};
  queryCount: any;
  noResults: boolean;
  errorMsg: string;
  typeOptions: any;
  status: any;
  type: any;
  searchQueryParams: {};
  isClicked: boolean=true;



  constructor(
    private announcementService: AnnouncementService,
    private toastr : ToastrManager,
    private fb:FormBuilder,
    private modalService: NgbModal
  ) {
    this.queryParams = {
      offset: this.offset,
      limit: this.limit
    };
  }

  ngOnInit() {
    this.announcement();

    this.announcementForm=this.fb.group({
      status:[""],
      type:[""]
    })

    this.typeOptions = [
      {
        "name": "ACHIEVEMENT",
        "value": "ACHIEVEMENT"
      }, {
        "name": "INFO",
        "value": "INFO"
      }]
  }

  

  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    this.queryParams["offset"] = this.offset;
    this.announcement();
  }


  filterSearch() {
    this.status= this.announcementForm.controls['status'].value;
    this.type = this.announcementForm.controls['type'].value;
    this.searchQueryParams = {};
    if (this.status) {
      this.searchQueryParams['status'] = this.status;
    }
    if (this.type) {
      this.searchQueryParams['type'] = this.type;
    }
    this.announcementService.filterData(this.searchQueryParams).subscribe(res => {
      this.announcementData = res.response.announcements;
      this.noResults = true;
      this.errorMsg = "No Results Found"
    })
  }
 

  reset(){
    this.announcementForm.reset();
    this.announcement();
    this.announcementForm.controls['status'].setValue('');
    this.announcementForm.controls['type'].setValue('');
  }

  announcement() {
    this.announcementService.getAnnouncement(this.queryParams).subscribe(res => {
      this.announcementData = res.response.announcements;
      this.queryCount = res.response.total;
      if(this.queryCount == 0){
        this.noResults=true;
        this.errorMsg="Data not available";
      }
    })
  }

  search() {
    if (this.textValue != "") {
      this.announcementService
        .filterAnnouncementData(this.textValue).subscribe((res: any) => {
          this.announcementData = res.response.announcements;
          this.queryCount = res.response.total;
          this.noResults=true;
          this.errorMsg="Sorry, We couldn't find any results";    
        });
    } else {
      this.announcement();
    }
  }


  getAnnouncementData(status : any, isForBadge : boolean): string {
    if(status){
      if(status == 1) {        
        return isForBadge ? "text-info" : "NEW";        
      } else if(status == 2){        
        return isForBadge ? "text-success" : "SENT"; 
        
      } else if(status == 3) {        
        return isForBadge ? "text-danger" : "FAILED";
      }
    } else {      
      return isForBadge ? "text-warning" : "NULL";
    }
    
  }


  sendAnnouncement(id : string) {
    this.announcementService.putAnnouncement(id).subscribe( result => {
      if(result){
        if(result.meta.status == 200){
          this.toastr.successToastr(result.meta.msg);
          this.announcement();
        } else {
          this.toastr.warningToastr(result.meta.msg);
        }
      } else {
        console.log("Response may be null");
      }
    })
  }

  toggle(){
    this.isClicked = !this.isClicked;
  }

  sendModal(id){
    const modalRef = this.modalService.open(SendAnnouncementComponent, {
      centered: true,
      backdrop:'static',
      keyboard:false
    })
    modalRef.componentInstance.id=id;
    modalRef.componentInstance.reload.subscribe($e => {
      this.announcement();
    })
  }
}