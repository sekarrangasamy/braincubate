import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AchievementsService } from '../achievements.service'; @Component({
  selector: 'app-delete-achievements',
  templateUrl: './delete-achievements.component.html',
  styleUrls: ['./delete-achievements.component.scss']
})
export class DeleteAchievementsComponent implements OnInit {
  @Input() id;
  @Output() reload = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private service: AchievementsService,
    public toastr: ToastrManager,
    private location: PlatformLocation) {
    location.onPopState(() => this.activeModal.close())
  }

  ngOnInit() {
  }

  delete() {
    this.service.deleteAchievement(this.id).subscribe((res) => {
      this.toastr.warningToastr('Deleted Successfully!');
      this.reload.next();
      this.activeModal.dismiss();
    })
  }

}
