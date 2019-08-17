import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml } from '@angular/platform-browser';
import { PlatformLocation } from '@angular/common'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AchievementsService } from '../achievements.service';
import { Config } from '../../config/config';
@Component({
  selector: 'app-create-achievements',
  templateUrl: './create-achievements.component.html',
  styleUrls: ['./create-achievements.component.scss']
})
export class CreateAchievementsComponent implements OnInit {
  dragAreaClass: string = 'dragarea';

  createForm: FormGroup;
  url: any;
  fileToUpload: any;
  formatDisable: boolean;
  sizeDisable: any;
  charLimit = Config.maxChars;
  textLimit: any;
  @Output() reload = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: AchievementsService,
    public toastr: ToastrManager,
    private _sanitizer: DomSanitizer,
    private location: PlatformLocation) {
    location.onPopState(() => this.activeModal.close());
  }

  ngOnInit() {
    this.textLimit = 0;
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      icon: ['']
    });
  }

  textLength(event) {
    this.textLimit = event.length;
  }
  //Drag and Drop
  @HostListener('dragover', ['$event']) onDragOver(event) {
    let dropArea = document.getElementById("dropzone")
    this.dragAreaClass = "droparea";
    event.preventDefault();
    event.stopPropagation();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
    event.stopPropagation();

  }
  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();

  }
  @HostListener('drop', ['$event']) onDrop(e) {
    let dropArea = document.getElementById("dropzone")
    this.dragAreaClass = "dragarea";
    const reader = new FileReader();
    event.preventDefault();
    event.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const [file] = e.dataTransfer.files;
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
      };
      if (file.size > Config.image.maxSize) {
        this.sizeDisable = true;
        this.toastr.warningToastr(' Image file size upto ' + Config.image.maxSize / 1000 + 'KB');

      } else {
        this.sizeDisable = false;
      }
    }
  }
  create() {
    var obj = {
      name: this.createForm.value.name,
      desc: this.createForm.value.desc
    }
    this.service.createAchievement(obj, this.fileToUpload).subscribe((res: any) => {
      this.toastr.successToastr('Created Successfully!');
      this.url = "";
      this.reload.next();
      this.activeModal.dismiss();
    }, error => {
      console.log("Error:", error);
    })
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
