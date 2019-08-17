import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AchievementsService } from '../achievements.service';
import { Config } from '../../config/config';
import { PlatformLocation } from '@angular/common'

@Component({
  selector: 'app-update-achievements',
  templateUrl: './update-achievements.component.html',
  styleUrls: ['./update-achievements.component.scss']
})
export class UpdateAchievementsComponent implements OnInit {
  updateForm: FormGroup;
  dragAreaClass: string = 'dragarea';
  @Input() id;
  @Input() name;
  @Input() desc;
  @Input() icon;
  @Output() reload = new EventEmitter();
  fileToUpload: any;
  previewToggle: any;
  formatDisable: boolean;
  sizeDisable: any;
  url: any;
  charLimit = Config.maxChars;
  textLimit: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: AchievementsService,
    public toastr: ToastrManager,
    private location:PlatformLocation
  ) { 
   location.onPopState(() => this.activeModal.close())
  }

  ngOnInit() {
    this.textLimit = this.desc.length;
    this.url = this.icon;
    this.fileToUpload = this.icon;
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      icon: ['']
    })

    this.updateForm.patchValue({
      name: this.name,
      desc: this.desc
    })
  }



  textLength(event) {
    this.textLimit = event.length;
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
    this.dragAreaClass = "dragarea";
    const reader = new FileReader();
    event.preventDefault();
    event.stopPropagation();
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
      if (file.size > Config.image.imgExtension) {
        this.toastr.warningToastr('Image file size upto 500KB');
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
        this.toastr.warningToastr('Image file size upto 500KB');
        this.sizeDisable = true;
      } else {
        this.sizeDisable = false;
      }
    }
  }
  update() {
    var obj = {
      name: this.updateForm.value.name,
      desc: this.updateForm.value.desc
    }
    this.service.updateAchievement(this.id, obj, this.fileToUpload).subscribe((res: any) => {
      this.toastr.successToastr('Updated Successfully!');
      this.reload.next();
      this.activeModal.dismiss();
    })
  }

}
