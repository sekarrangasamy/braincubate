import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LevelsService } from './levels.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Config } from '../config/config';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {

  levelForm: FormGroup;
  textValue: any;
  levelData: any;
  levelData_score: any;
  name: any;
  textLimit: any = Config.maxChars;
  searchQueryParams: any = {};

  levelScoreForm: FormGroup;
  particularLevelData: any;
  levelDataValue: any;
  flagValue: any;
  levelId: any;
  img_url: any;
  bg_url: any;
  icon: any;
  bg_img: any;
  icon_name: any;
  bg_name: any;

  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  queryParams: any = {};
  queryCount: any;
  noResults: boolean;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private levelService: LevelsService,
    public toastr: ToastrManager,
    private cd: ChangeDetectorRef
  ) {
    this.queryParams = {
      offset: this.offset,
      limit: this.limit
    };
  }

  ngOnInit() {
    this.levels();

    this.levelForm = this.formBuilder.group({
      name: ['']
    })

    this.levelScoreForm = this.formBuilder.group({
      accuracy: [''],
      concentration: [''],
      memory: [''],
      problem_solving: [''],
      speed: [''],
      visual: ['']
    })
  }

  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    this.queryParams["offset"] = this.offset;
    this.levels();
  }

  levels() {
    this.flagValue = 'default';
    this.levelService.getLevels(this.queryParams).subscribe(res => {
      this.levelData = res.response.levels;
      this.queryCount = res.response.total;
      if (this.queryCount == 0) {
        this.noResults = true;
        this.errorMsg = "Data not available";
      }
    })
  }

  searchName() {
    if (this.textValue != "") {
      this.levelService.nameFilter(this.textValue).subscribe((res: any) => {
        this.levelData = res.response.levels;
        this.queryCount = res.response.total;
        this.noResults = true;
        this.errorMsg = "Sorry, We couldn't find any results";
      });
    } else {
      this.levels();
    }
  }

  // search() {
  //   this.name = this.levelForm.controls['name'].value;

  //   this.searchQueryParams = {};
  //   if (this.name) {
  //     this.searchQueryParams.name = this.name
  //   }
  //   this.levelService.filterLevelData(this.searchQueryParams).subscribe(res => {
  //     this.levelData = res.response.Levels;
  //     this.queryCount = res.response.total;
  //   })
  // }

  cancel() {
    this.levelForm.reset();
    this.levels();
  }

  editScoreForm(level) {
    this.flagValue = 'editScore';
    this.particularLevelData = level;
    this.levelScoreForm.controls['accuracy'].setValue(this.particularLevelData.required_score.accuracy);
    this.levelScoreForm.controls['concentration'].setValue(this.particularLevelData.required_score.concentration);
    this.levelScoreForm.controls['memory'].setValue(this.particularLevelData.required_score.memory);
    this.levelScoreForm.controls['problem_solving'].setValue(this.particularLevelData.required_score.problem_solving);
    this.levelScoreForm.controls['speed'].setValue(this.particularLevelData.required_score.speed);
    this.levelScoreForm.controls['visual'].setValue(this.particularLevelData.required_score.visual);
  }

  saveScoreForm(level) {
    this.levelDataValue = level;
    this.levelId = level._id;
    var obj = {
      "name": this.levelDataValue.name,
      "color_code":this.levelDataValue.color_code,
      "characteristics":JSON.stringify(this.levelDataValue.characteristics),
      "speed": this.levelScoreForm.controls['speed'].value,
      "memory": this.levelScoreForm.controls['memory'].value,
      "concentration": this.levelScoreForm.controls['concentration'].value,
      "problem_solving": this.levelScoreForm.controls['problem_solving'].value,
      "accuracy": this.levelScoreForm.controls['accuracy'].value,
      "visual": this.levelScoreForm.controls['visual'].value,
    }

    this.levelService.updateLevel(this.levelId, obj, this.icon, this.bg_img).subscribe(res => {
      if (res.meta.status == 200) {
        this.toastr.successToastr(res.meta.msg);
        this.levels();
      }
    })
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
          this.levelScoreForm.patchValue({
            file: reader.result
          });
          this.icon = file;
          this.icon_name = file.name;
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
        this.toastr.warningToastr('Please upload less than 500KB size image');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.bg_url = reader.result;
          this.levelScoreForm.patchValue({
            file: reader.result
          });
          this.bg_img = file;
          this.bg_name = file.name;
          this.cd.markForCheck();
        };
      }
    }
  }
}
