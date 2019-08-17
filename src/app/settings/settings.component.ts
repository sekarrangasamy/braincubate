import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './settings.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Config } from '../config/config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  dragAreaClass: string = 'dragarea';
  fileToUpload: any;
  url: any;
  formatDisable: boolean;
  sizeDisable: any;
  results: any = [];
  buttonToggle: any;
  previewToggle: any;
  initialToggle: any;
  passToggleSignal: any;
  id: any;

  isInvalidContact : boolean;
  isInvalidEmail : boolean;

  invalidContactMsg : string;
  invalidEmailMsg : string;  

  constructor(private fb: FormBuilder,
    private service: SettingsService,
    public toastr: ToastrManager,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.initialLoad();
    this.settingsForm = this.fb.group({
      website: [''],
      fb: [''],
      google: [''],
      email: [''],
      mobileNo: [''],
      logo: ['']
    })
  }
  initialLoad() {
    this.service.getAll().subscribe((res) => {
      this.results = res.response[0];
      if (res.response.length == 0) {
        this.buttonToggle = true;
        this.initialToggle = true;
      } else {
        this.buttonToggle = false;
        this.initialToggle = false;
        this.results = res.response[0];
        this.id = this.results._id;
        this.url = this.results.logo;
        this.fileToUpload = this.results.logo;
        this.settingsForm.patchValue({
          website: this.results.website,
          fb: this.results.fb_link,
          google: this.results.google_link,
          email: this.results.email,
          mobileNo: this.results.phone
        })
      }
    });
  }

  //Drag and Drop
  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.dragAreaClass = "dragarea";
    const reader = new FileReader();
    if (event.dataTransfer.files && event.dataTransfer.files.length) {
      const [file] = event.dataTransfer.files;
      reader.readAsDataURL(file);
      reader.onload = (event: ProgressEvent) => {
        this.fileToUpload = file;
        let imgValidationExpression = Config.image.imgExtension;
        let imgvalue = imgValidationExpression.test(this.fileToUpload.name);
        if (!imgvalue) {
          this.toastr.warningToastr('Not valid Format');
          this.formatDisable = true;
          this.url = "";
        } else {
          this.formatDisable = false;
          this.url = (<FileReader>event.target).result;
        }
      };
      if (file.size > Config.image.maxSize) {
        this.toastr.warningToastr(' Image file size upto ' + Config.image.maxSize / 1000 + 'KB');
        this.sizeDisable = true;
      } else {
        this.sizeDisable = false;
      }
    }
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (event: ProgressEvent) => {
        this.fileToUpload = file;
        let imgValidationExpression = Config.image.imgExtension;
        let imgvalue = imgValidationExpression.test(this.fileToUpload.name);
        if (!imgvalue) {
          this.toastr.warningToastr('Not valid Format');
          this.formatDisable = true;
          this.url = "";
        } else {
          this.formatDisable = false;
          this.url = (<FileReader>event.target).result;
        }
      }
      if (file.size > Config.image.maxSize) {
        this.toastr.warningToastr(' Image file size upto ' + Config.image.maxSize / 1000 + 'KB ');
        this.sizeDisable = true;
      } else {
        this.sizeDisable = false;
      }
    }
  }

  save() {
    var obj = {
      website: this.settingsForm.value.website,
      fb_link: this.settingsForm.value.fb,
      google_link: this.settingsForm.value.google,
      email: this.settingsForm.value.email,
      phone: this.settingsForm.value.mobileNo
    }
    this.service.createSettings(obj, this.fileToUpload).subscribe((res: any) => {
      this.toastr.successToastr('Created Successfully!');
      this.initialLoad();
    })
  }

  update(e) {
    var obj = {
      website: this.settingsForm.value.website,
      fb_link: this.settingsForm.value.fb,
      google_link: this.settingsForm.value.google,
      email: this.settingsForm.value.email,
      phone: this.settingsForm.value.mobileNo
    }
    this.service.updateSettings(this.results._id, obj, this.fileToUpload).subscribe((res: any) => {
      this.toastr.successToastr('Updated Successfully!');
      this.initialLoad();
    })
  }


  contactValidate(event : any){
    if(event && event.target.value) {
      this.isInvalidContact= /[+]91[0-9]{10}/.test(event.target.value) ? false : true;
      this.invalidContactMsg = this.isInvalidContact ? "Please enter Valid Telephone Number starts with +91" : "";
    }
  }

  emailValidate(event : any){
    if(event && event.target.value) {
      this.isInvalidEmail= /^([a-z]+)[a-z0-9]*@ibytecode[.]com/.test(event.target.value) ? false : true;
      this.invalidEmailMsg = this.isInvalidEmail ? "Please enter Valid Email" : "";
    }
  }

}
