import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LevelsService } from '../levels.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Config } from '../../config/config';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
  selector: 'app-create-levels',
  templateUrl: './create-levels.component.html',
  styleUrls: ['./create-levels.component.scss']
})
export class CreateLevelsComponent implements OnInit {
  public color: string = '';
  public cmykValue: string = '';
  submitted = false;
  createLevelForm: FormGroup;
  editCharForm:FormGroup;
  characteristicArrayData: any = [];
  bottom = 'bottom-left';
  bottomcpmobile = 'bottom'
  isVisible : boolean = false;
  isSave;
  btnName: any;
  submitBtn: any;
  title: any;
  levelId: any;
  editLevelValue: any;
  indexV:any;
  img_url: any;
  bg_url: any;
  icon: any;
  bg_img: any;
  icon_name: any;
  bg_name: any;
  characteristicsData: any;
  imgUpload: any;
  imgExt: any;
  imgLabelLimit: any = Config.imglabelSize;
  scorllVisisble: any;
  flag: string;
  flagId: any;
  selectedIndex: any;
  editIndeex: any;
  flagValue: string;
  testBoo: boolean = false;
  name: any;
  domains: any;
  editValue: string;
  constructor(
    private formBuilder: FormBuilder,
    private levelService: LevelsService,
    public toastr: ToastrManager,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private cpService: ColorPickerService
  ) {
  
   }

  ngOnInit() {
    this.imgUpload = "Choose File";
    this.route.queryParams.subscribe(params => {
      this.btnName = params.btnname;
      this.levelId = params.id;
    });

    if (this.btnName == 'create') {
      this.title = "Create";
      this.submitBtn = "Create";
    } else if (this.btnName == 'edit') {
      this.title = "Edit";
      this.submitBtn = "Update";
      this.editLevelForm();
    }

    this.editCharForm = this.formBuilder.group({
      editCharacteristics:''
    })

   

    this.createLevelForm = this.formBuilder.group({
      game_name: ['', Validators.required],
      color_code:[''],
      image_name: [],
      bg_image: [],
      characteristics: [""],
      speed: ['0'],
      memory: ['0'],
      concentration: ['0'],
      problem_solving: ['0'],
      accuracy: ['0'],
      visual: ['0']
    })
  }
  data: any;

  editLevelForm() {
    this.levelService.getParticularLevel(this.levelId).subscribe(res => {
      if (res.response.characteristics !== null) {
        this.characteristicArrayData = res.response.characteristics;
      }
      this.editLevelValue = res.response;
      this.color= res.response.color_code;
      this.createLevelForm.controls['game_name'].setValue(this.editLevelValue.name);
      this.createLevelForm.controls['speed'].setValue(this.editLevelValue.required_score.speed);
      this.createLevelForm.controls['memory'].setValue(this.editLevelValue.required_score.memory);
      this.createLevelForm.controls['concentration'].setValue(this.editLevelValue.required_score.concentration);
      this.createLevelForm.controls['problem_solving'].setValue(this.editLevelValue.required_score.problem_solving);
      this.createLevelForm.controls['accuracy'].setValue(this.editLevelValue.required_score.accuracy);
      this.createLevelForm.controls['visual'].setValue(this.editLevelValue.required_score.visual);
      this.characteristicsData = this.editLevelValue.characteristics;
      this.createLevelForm.controls['color_code'].setValue(this.editLevelValue.color_code);
      this.img_url = this.editLevelValue.icon;
      this.bg_url = this.editLevelValue.bg_img;
      if (!this.editLevelValue.icon) {
        this.icon_name = "";
      } else {
        this.icon_name = this.editLevelValue.icon.split('/').pop();
        this.imgExt = this.icon_name.split('.').pop();
      }

      if (!this.editLevelValue.bg_img) {
        this.bg_name = "";
      } else {
        this.bg_name = this.editLevelValue.bg_img.split('/').pop();
        this.imgExt = this.bg_name.split('.').pop();
      }

    })
  }

  get f() {
    return this.createLevelForm.controls;
  }

  inputCode(event){
    this.color = event.target.value;
  }

 
  editDomain(i,data){
    if(this.characteristicArrayData[i]){
       this.name = this.characteristicArrayData[i];
       this.editValue = 'edit';
    }

    this.editCharForm.setValue({
      editCharacteristics:data
    })
    }
  
    saveDomain(i,data){
      this.editValue ='close'
      var index = this.characteristicArrayData.indexOf(data);
      if(index !== -1){
        this.characteristicArrayData[index] = this.editCharForm.controls['editCharacteristics'].value;
      }
    }


 

  public onChangeColorCmyk(color: string){
    this.color = color; 
  }

  onSubmit() {
    if (this.levelId) {
      this.submitted = true;
      if (this.createLevelForm.invalid) {
        this.toastr.warningToastr("Filed Reqiured");
      } else {
        if (this.characteristicArrayData.length !== 0) {
        
          var obj = {
            "name": this.createLevelForm.controls['game_name'].value,
            "speed": this.createLevelForm.controls['speed'].value,
            "memory": this.createLevelForm.controls['memory'].value,
            "concentration": this.createLevelForm.controls['concentration'].value,
            "problem_solving": this.createLevelForm.controls['problem_solving'].value,
            "accuracy": this.createLevelForm.controls['accuracy'].value,
            "visual": this.createLevelForm.controls['visual'].value,
            "characteristics": JSON.stringify(this.characteristicArrayData),
            "color_code":this.color,
          }

          this.levelService.updateLevel(this.levelId, obj, this.icon, this.bg_img).subscribe(res => {
            if (res.meta.status == 200) {
              this.router.navigate(['/levels']);
              this.toastr.successToastr(res.meta.msg);
            }
          })

        } else {
          var obj2 = {
            "name": this.createLevelForm.controls['game_name'].value,
            "speed": this.createLevelForm.controls['speed'].value,
            "memory": this.createLevelForm.controls['memory'].value,
            "concentration": this.createLevelForm.controls['concentration'].value,
            "problem_solving": this.createLevelForm.controls['problem_solving'].value,
            "accuracy": this.createLevelForm.controls['accuracy'].value,
            "visual": this.createLevelForm.controls['visual'].value,
            "color_code":this.color
          }


          this.levelService.updateLevel(this.levelId, obj2, this.icon, this.bg_img).subscribe(res => {
            if (res.meta.status == 200) {
              this.router.navigate(['/levels']);
              this.toastr.successToastr(res.meta.msg);
            }
          })
        }

      }
    } else {
      this.submitted = true;
      if (this.createLevelForm.invalid) {
        this.toastr.warningToastr("Fields Reqiured");
      } else {
        if (this.characteristicArrayData.length !== 0) {
          var obj = {
            "name": this.createLevelForm.controls['game_name'].value,
            "speed": this.createLevelForm.controls['speed'].value,
            "memory": this.createLevelForm.controls['memory'].value,
            "concentration": this.createLevelForm.controls['concentration'].value,
            "problem_solving": this.createLevelForm.controls['problem_solving'].value,
            "accuracy": this.createLevelForm.controls['accuracy'].value,
            "visual": this.createLevelForm.controls['visual'].value,
            "characteristics": JSON.stringify(this.characteristicArrayData),
            "color_code":this.color
          }

          this.levelService.createLevel(obj, this.icon, this.bg_img).subscribe(res => {
            if (res.meta.status == 201) {
              this.router.navigate(['/levels']);
              this.toastr.successToastr(res.meta.msg);
            } else {
              this.toastr.warningToastr("Levels not created");
            }
          })
        } else {

          var obj1 = {
            "name": this.createLevelForm.controls['game_name'].value,
            "speed": this.createLevelForm.controls['speed'].value,
            "memory": this.createLevelForm.controls['memory'].value,
            "concentration": this.createLevelForm.controls['concentration'].value,
            "problem_solving": this.createLevelForm.controls['problem_solving'].value,
            "accuracy": this.createLevelForm.controls['accuracy'].value,
            "visual": this.createLevelForm.controls['visual'].value,
            "color_code":this.color
          }

          this.levelService.createLevel(obj1, this.icon, this.bg_img).subscribe(res => {
            if (res.meta.status == 201) {
              this.router.navigate(['/levels']);
              this.toastr.successToastr(res.meta.msg);
            } else {
              this.toastr.warningToastr("Levels not created");
            }
          })
        }
      }
    }
  }

  

  cancel() {
    this.createLevelForm.reset();
    this.router.navigate(['/levels'])
    this.img_url = "";
    this.bg_url = "";
    this.icon_name = "";
    this.bg_name = "";
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
      if (file.size > 500000) {
        this.toastr.warningToastr('Please upload less than 500KB size image');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.img_url = reader.result;
          this.createLevelForm.patchValue({
            file: reader.result
          });
          this.icon = file;
          this.icon_name = file.name;
          this.imgExt = this.icon_name.split('.').pop();
          this.cd.markForCheck();
        };
      }

    }
  }

  onBgImageUpload(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let imgValidationExpression = /\.(jpg|jpeg|png|bmp|svg)$/i;
      let imgvalue = imgValidationExpression.test(file.name);
      if (!imgvalue) {
        this.toastr.warningToastr('Invalid format');
      }
      if (file.size > 500000) {
        setTimeout(()=>{
          this.toastr.warningToastr('Please upload less than 500KB size image');
        },1)
       
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.bg_url = reader.result;
          this.createLevelForm.patchValue({
            file: reader.result
          });
          this.bg_img = file;
          this.bg_name = file.name;
          this.imgExt = this.bg_name.split('.').pop();
          this.cd.markForCheck();
        };
      }
    }
  }

  addCharacteristics(data) {
    if ((data || '').trim()) {
      if (data !== "") {
        this.characteristicArrayData.push(data.trim());
      }
    }
    if (this.characteristicArrayData.length > 4) {
      this.scorllVisisble = true;
    }
    this.createLevelForm.controls.characteristics.reset("");
  }

  deleteCharacteristic(charArrayData) {
    const index = this.characteristicArrayData.indexOf(charArrayData);

    if (index >= 0) {
      this.characteristicArrayData.splice(index, 1);
    }

    if (this.characteristicArrayData.length <= 4) {
      this.scorllVisisble = false;
    }
  }

  // setClickedRow(i){
  //   this.selectedIndex= i;
  //   // if(this.selectedIndex === this.editIndeex){
  //   //   this.isVisible= true;
  //   // }else{
  //   //   this.isVisible =false;
  //   // }

  // }
}
