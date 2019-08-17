import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Config } from 'src/app/config/config';
@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.scss']
})
export class CreateAnnouncementComponent implements OnInit {

  submitted = false;
  createAnnouncementForm: FormGroup
  typeOptions: any;
  // statusOptions : any;

  btnName: any;
  submitBtn: any;
  title: any;
  announcementId: any;
  editAnnouncementValue: any;

  img_url: any;
  icon: any;
  game_icon_name: any;
  imgExt:any;
  imgLabelLimit=Config.imglabelSize;

  errorStatus: any;
  errorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    public toastr: ToastrManager,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.btnName = params.btnname;
      this.announcementId = params.id;
    });

    if (this.btnName == 'create') {
      this.title = "Create";
      this.submitBtn = "Create";
    } else if (this.btnName == 'edit') {
      this.title = "Edit";
      this.submitBtn = "Update";
      this.editAnnouncemnetForm();
    }

    this.typeOptions = [
      {
        "name": "ACHIEVEMENT",
        "value": "ACHIEVEMENT"
      }, {
        "name": "INFO",
        "value": "INFO"
      }]

    // this.statusOptions = [
    //   {
    //     "name" : "New",
    //     "value" : 1
    //   }, {
    //     "name" : "Send",
    //     "value" : 2
    //   }, {
    //     "name" : "Failed",
    //     "value" : 3
    //   }
    // ]

    this.createAnnouncementForm = this.formBuilder.group({
      announcement_title: ['', Validators.required],
      icon_name: [""],
      description: [""],
      type: ['', Validators.required]
      // status: ['']
    })
  }

  get f() {
    return this.createAnnouncementForm.controls;
  }

  editAnnouncemnetForm() {
    this.announcementService.getParticularAnnouncement(this.announcementId).subscribe(res => {
      this.editAnnouncementValue = res.response;
      this.createAnnouncementForm.controls['announcement_title'].setValue(this.editAnnouncementValue.title);
      this.createAnnouncementForm.controls['description'].setValue(this.editAnnouncementValue.desc);
      this.createAnnouncementForm.controls['type'].setValue(this.editAnnouncementValue.type);
      // this.createAnnouncementForm.controls['status'].setValue(this.editAnnouncementValue.status);
      this.img_url = this.editAnnouncementValue.icon;
      if (!this.editAnnouncementValue.icon) {
        this.game_icon_name = "";
      } else {
        this.game_icon_name = this.editAnnouncementValue.icon.split('/').pop();
        this.imgExt=this.game_icon_name.split('.').pop();
      }
    })
  }

  onSubmit() {
    var obj;
    if (this.announcementId) {
      this.submitted = true;
      if (this.createAnnouncementForm.invalid) {
        this.toastr.warningToastr('Fields Required');
      } else {
        obj = {
          "title": this.createAnnouncementForm.controls['announcement_title'].value,
          "desc": this.createAnnouncementForm.controls['description'].value,
          "type": this.createAnnouncementForm.controls['type'].value,
          // "status": this.createAnnouncementForm.controls['status'].value
        }
        this.announcementService.updateAnnouncement(this.announcementId, obj, this.icon).subscribe(res => {
          if (res.meta.status == 200) {
            this.router.navigate(['/announcement']);
            this.toastr.successToastr(res.meta.msg);
          }
        })
      }
    } else {
      this.submitted = true;
      if (this.createAnnouncementForm.invalid) {
        this.toastr.warningToastr('Fields Required');
      } else {
        obj = {
          "title": this.createAnnouncementForm.controls['announcement_title'].value,
          "desc": this.createAnnouncementForm.controls['description'].value,
          "type": this.createAnnouncementForm.controls['type'].value,
          // "status": this.createAnnouncementForm.controls['status'].value
        }
        this.announcementService.createAnnouncement(obj, this.icon).subscribe(res => {
          if (res.meta.status == 201) {
            this.toastr.successToastr(res.meta.msg);
            this.router.navigate(['/announcement']);
          } else {
            this.toastr.warningToastr("Games not created");
          }
        }, error => {
          this.errorStatus = error.error.meta.status;
          if (this.errorStatus == '500') {
            this.errorMsg = error.error.meta.msg;
            this.toastr.warningToastr(this.errorMsg);
          }
        })
      }
    }
  }

  cancel() {
    this.createAnnouncementForm.reset();
    this.router.navigate(['/announcement']);
    this.img_url = "";
    this.game_icon_name = "";
  }

  onImageUpload(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let imgValidationExpression = /\.(jpg|jpeg|png|bmp|svg)$/i;
      let imgvalue = imgValidationExpression.test(file.name);
      if (!imgvalue) {
        this.toastr.warningToastr('Invalid format');
      }
      if (file.size > 500 * 1000) {
        this.toastr.warningToastr('Please upload less the 500KB size image');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.img_url = reader.result;
          this.createAnnouncementForm.patchValue({
            file: reader.result
          });
          this.icon = file;
          this.game_icon_name = file.name;
          this.imgExt=this.game_icon_name.split('.').pop();
        };
      }
    }
  }
}


