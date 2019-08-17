import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common'
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-send-announcement',
  templateUrl: './send-announcement.component.html',
  styleUrls: ['./send-announcement.component.scss']
})
export class SendAnnouncementComponent implements OnInit {
  sendAnnouncement: FormGroup;
  checkedList: any;
  isSelected: boolean = false;
  isAllChecked : boolean = false;
  @Input() id;
  @Output() reload = new EventEmitter(); 

  optionsList = [
    { id: 1, value: "Push Notifications",isChecked:false },
    { id: 2, value: "Facebook",isChecked:false},
    { id: 3, value: "Google",isChecked:false}
  ]
  constructor(
    public activeModal: NgbActiveModal, 
    private location: PlatformLocation, 
    private fb: FormBuilder,
    private announcementService:AnnouncementService,
    private toastr : ToastrManager,) {

    location.onPopState(() => this.activeModal.close())

    // Create a FormControl for each available optionlist, initialize them as unchecked, and put them in an array
    const formControls = this.optionsList.map(control => new FormControl(false));

    // Create a FormControl for the select/unselect all checkbox
    const selectAllControl = new FormControl(false);

    // Simply add the list of FormControls to the FormGroup as a FormArray, add the selectAllControl separetely
    this.sendAnnouncement = this.fb.group({
      unitArr: new FormArray(formControls),
      selectAll: selectAllControl
    });

  }



  ngOnInit() {
    this.onChanges();
  }

  onChanges(): void {
    
    this.sendAnnouncement.get('selectAll').valueChanges.subscribe(bool => {
      this.isAllChecked = !this.isAllChecked;
      if(this.isAllChecked){
        this.optionsList.forEach(val => {
          val.isChecked = true;
        });
      }else{
        this.optionsList.forEach(val =>{
          val.isChecked = false;
        })
      }
      this.sendAnnouncement
        .get('unitArr')
        .patchValue(Array(this.optionsList.length).fill(bool), { emitEvent: false });
    });

    // Subscribe to changes on the optionlist checkboxes
    this.sendAnnouncement.get('unitArr').valueChanges.subscribe(val => {
      const allSelected = val.every(bool => bool);
      if (this.sendAnnouncement.get('selectAll').value !== allSelected) {
        this.isAllChecked=allSelected;
        this.sendAnnouncement.get('selectAll').patchValue(allSelected, { emitEvent: false });
      }

 

    });
  }

 

  onCheckboxChanges(event,i){
     //checkbox
     this.optionsList[i].isChecked = event.target.checked;	
  }

 
  submit() {
    const selectedPreferences = this.sendAnnouncement.value.unitArr
      .map((checked, index) => checked ? this.optionsList[index].value : null)
      .filter(value => value !== null);
    console.log(selectedPreferences)

    this.announcementService.putAnnouncement(this.id).subscribe( result => {
      if(result){
        if(result.meta.status == 200){
          this.toastr.successToastr(result.meta.msg);
          this.activeModal.close();
          this.reload.next();
        } else {
          this.toastr.warningToastr(result.meta.msg);
          this.activeModal.close();
          this.reload.next();
        }
      } else {
        console.log("Response may be null");
      }
    })
  }
}
