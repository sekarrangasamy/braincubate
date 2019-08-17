import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LevelsService } from '../../levels';
import { GamesService } from '../games.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { Config } from '../../config/config';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import {DashboardService} from '../../dashboard/dashboard.service';
@Component({
  selector: 'app-create-games',
  templateUrl: './create-games.component.html',
  styleUrls: ['./create-games.component.scss']
})
export class CreateGamesComponent implements OnInit {

  submitted = false;
  addInstDescCheck = false;
  createGameForm: FormGroup;
  instructionForm: FormGroup;
  gamedifficult: any;
  levelData: any;

  btnName: any;
  submitBtn: any;
  title: any;
  GameId: any;
  editGameValue: any;
  updateInstValue: any;

  img_url: any;
  bg_url: any;
  icon: any;
  bg_img: any;
  inst_url: any;
  inst_icon: any;
  game_icon_name: any;
  bg_name: any;
  inst_name: any;
  imgUpload: any;
  imgLabelLimit = Config.imglabelSize;


  instruction_description: any;
  inst_obj: any;
  instruArray: any = [];

  errorStatus: any;
  errorMsg: any;
  imgExt: any;
  inst_Desc: any = [];
  insturction_Desc: any = [];
  inst_Icon_obj: any = {};
  value: any;
  urls: any = []
  addArr: any = [];
  viewArr: any = [];
  updateAddArr: any = [];
  imgSelected: any;
  selectedId: any;
  testObj = {};
  levelsCount: any;
  limit:10;
  offset:0;
  noResult: boolean=false;
  searchValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private levelService: LevelsService,
    private gameService: GamesService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public toastr: ToastrManager,
    private router: Router,
    private dashboardService:DashboardService
  ) { }

  ngOnInit() {
    this.dashboardService.getAllCount().subscribe((res => {
      this.levelsCount = res.response.levels;
    }));
    
    this.imgUpload = "Choose File";
    this.route.queryParams.subscribe(params => {
      this.btnName = params.btnname;
      this.GameId = params.id;
    });

    if (this.btnName == 'create') {
      this.title = "Create"
      this.submitBtn = "Create";
    } else if (this.btnName == 'edit') {
      this.title = "Edit"
      this.submitBtn = "Update";
      this.editGameForm();
    }

    this.gamedifficult = [
      {
        "name": "Easy",
        "value": "Easy"
      }, {
        "name": "Medium",
        "value": "Medium"
      }, {
        "name": "Hard",
        "value": "Hard"
      }
    ]

    this.createGameForm = this.formBuilder.group({
      game_name: ['', Validators.required],
      image_name: [],
      bg_image: [],
      description: [''],
      level: ['', Validators.required],
      level_position: ['', Validators.required],
      game_time_in_sec: ['0', Validators.required],
      qus_time_in_sec: ['0'],
      // difficult: ['', Validators.required],
      speed: ['0'],
      memory: ['0'],
      concentration: ['0'],
      problem_solving: ['0'],
      accuracy: ['0'],
      visual: ['0']
    })
    this.Levels();

    this.instructionForm = this.formBuilder.group({
      instruction_description: ['', Validators.required],
      instruction_icon: ['']
    })
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
  }

  get f() {
    return this.createGameForm.controls;
  }

  get fc() {
    return this.instructionForm.controls;
  }




  editGameForm() {
    this.gameService.getSingleGame(this.GameId).subscribe(res => {
      this.editGameValue = res.response;
      this.searchValue=this.editGameValue.level._id;
      this.createGameForm.controls['game_name'].setValue(this.editGameValue.name);
      this.createGameForm.controls['description'].setValue(this.editGameValue.desc);
      this.createGameForm.controls['level'].setValue(this.editGameValue.level.name);
      this.createGameForm.controls['level_position'].setValue(this.editGameValue.level_position);
      this.createGameForm.controls['game_time_in_sec'].setValue(this.editGameValue.game_time_in_sec);
      this.createGameForm.controls['qus_time_in_sec'].setValue(this.editGameValue.question_time_in_sec);
      // this.createGameForm.controls['difficult'].setValue(this.editGameValue.difficulty);
      this.createGameForm.controls['speed'].setValue(this.editGameValue.score.speed);
      this.createGameForm.controls['memory'].setValue(this.editGameValue.score.memory);
      this.createGameForm.controls['concentration'].setValue(this.editGameValue.score.concentration);
      this.createGameForm.controls['problem_solving'].setValue(this.editGameValue.score.problem_solving);
      this.createGameForm.controls['accuracy'].setValue(this.editGameValue.score.accuracy);
      this.createGameForm.controls['visual'].setValue(this.editGameValue.score.visual);
      this.img_url = this.editGameValue.icon;
      this.bg_url = this.editGameValue.bg_img;

      if (!this.editGameValue.icon) {
        this.game_icon_name = "";
      } else {
        this.game_icon_name = this.editGameValue.icon.split('/').pop();
        this.imgExt = this.game_icon_name.split('.').pop();
      }

      if (!this.editGameValue.bg_img) {
        this.bg_name = "";
      } else {
        this.bg_name = this.editGameValue.bg_img.split('/').pop();
        this.imgExt = this.bg_name.split('.').pop();
      }


      this.editGameValue.instruction.forEach(element => {
        let inst_data = element;
        let obj = {
          _id: element._id,
          imgName: element.icon,
          imgDesc: element.desc
        }

        this.viewArr.push(obj);
      });
    })
  }

  Levels() {
    let queryParams = {
      limit:10,
      offset:0
    }
    this.levelService.getLevels(queryParams).subscribe(res => {
      this.levelData = res.response.levels;
    });
  }

  onSelected(event:TypeaheadMatch) {
    this.searchValue = event.item._id;
  }

  change(value) {
    if (value == "") {
      this.Levels();
    } else {
      this.levelService.nameFilter(value).subscribe((res: any) => {
        this.levelData = res.response.levels;
      })
    }

  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }
  onSubmit() {
    var obj;
    if (this.GameId) {
      this.submitted = true;
      if (this.createGameForm.invalid) {
        this.toastr.warningToastr("Fields Required");
      } else {
        obj = {
          "name": this.createGameForm.controls['game_name'].value,
          "desc": this.createGameForm.controls['description'].value,
          "level": this.searchValue,
          "level_position": this.createGameForm.controls['level_position'].value,
          "game_time_in_sec": this.createGameForm.controls['game_time_in_sec'].value,
          "question_time_in_sec": this.createGameForm.controls['qus_time_in_sec'].value,
          // "difficulty": this.createGameForm.controls['difficult'].value,
          "speed": this.createGameForm.controls['speed'].value,
          "memory": this.createGameForm.controls['memory'].value,
          "concentration": this.createGameForm.controls['concentration'].value,
          "problem_solving": this.createGameForm.controls['problem_solving'].value,
          "accuracy": this.createGameForm.controls['accuracy'].value,
          "visual": this.createGameForm.controls['visual'].value,
        }

        this.addArr.forEach(element => {
          console.log(element);
          let obj = {
            imgName: element.imgName,
            imgDesc: element.imgDesc,
          }
          this.gameService.updateInstruction(this.GameId, obj).subscribe((res: any) => {
          })
        });
        this.gameService.updateGame(this.GameId, obj, this.icon, this.bg_img).subscribe(res => {
          if (res.meta.status == 200) {
            this.toastr.successToastr(res.meta.msg);
            this.router.navigate(['/games']);
          }
        })
      }
    } else {
      this.submitted = true;
      if (this.createGameForm.invalid) {
        this.toastr.warningToastr("Fields Required");
      } else {
        obj = {
          "name": this.createGameForm.controls['game_name'].value,
          "desc": this.createGameForm.controls['description'].value,
          "level":this.searchValue,
          "level_position": this.createGameForm.controls['level_position'].value,
          "game_time_in_sec": this.createGameForm.controls['game_time_in_sec'].value,
          "question_time_in_sec": this.createGameForm.controls['qus_time_in_sec'].value,
          // "difficulty": this.createGameForm.controls['difficult'].value,
          "speed": this.createGameForm.controls['speed'].value,
          "memory": this.createGameForm.controls['memory'].value,
          "concentration": this.createGameForm.controls['concentration'].value,
          "problem_solving": this.createGameForm.controls['problem_solving'].value,
          "accuracy": this.createGameForm.controls['accuracy'].value,
          "visual": this.createGameForm.controls['visual'].value,
        }
        this.gameService.createGames(obj, this.icon, this.bg_img, this.addArr).subscribe(res => {
          if (res.meta.status == 201) {
            this.toastr.successToastr(res.meta.msg);
            this.router.navigate(['/games']);
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
    this.createGameForm.reset();
    this.router.navigate(['/games']);
    this.img_url = "";
    this.bg_url = "";
    this.inst_url = "";
    this.game_icon_name = "";
    this.bg_name = "";
    this.inst_name = "";
  }

  onImageUpload(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let imgValidationExpression = /\.(jpg|jpeg|png|bmp|svg)$/;
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
          this.createGameForm.patchValue({
            file: reader.result
          });
          this.icon = file;
          this.game_icon_name = file.name;
          this.imgExt = this.game_icon_name.split('.').pop();
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
          this.createGameForm.patchValue({
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

  onInstructionImageUpload(event) {

    const reader = new FileReader();
    var imgFile = {};
    if (event.target.files && event.target.files[0]) {
      this.imgSelected = true;
      var lengthImage = event.target.length;
      const [file] = event.target.files;
      let imgValidationExpression = /\.(jpg|jpeg|png|bmp|svg)$/;
      let imgvalue = imgValidationExpression.test(file.name);
      if (!imgvalue) {
        this.toastr.warningToastr('Invalid format');
      }
      if (file.size > 500000) {
        this.toastr.warningToastr('Please upload less than 500KB size image');
      } else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.inst_url = reader.result;
          this.createGameForm.patchValue({
            file: reader.result
          });
          this.inst_icon = file;
          imgFile = this.inst_icon;
          this.urls.push(imgFile);
          this.inst_name = file.name;
          this.imgExt = this.inst_name.split('.').pop();
          this.cd.markForCheck();
        };
      }
    }
  }

  addInstruction(name, desc) {
    let addobj = {
      imgURL: this.inst_url,
      imgName: this.inst_icon,
      viewDesc: desc,
      imgDesc: desc
    }
    this.testObj = {
      imgName: this.inst_icon,
      imgDesc: desc,
      imgURL: this.inst_url
    }
    // this.addArr.push(addobj);
    if (this.GameId) {
      this.addArr.push(this.testObj);

      // this.gameService.getGames1().subscribe((res:any)=>{
      //   console.log("adddd",res);
      // })
    } else {
      this.addArr.push(addobj);
    }
    this.inst_name = "";
    this.instructionForm.controls.instruction_description.reset("");
  }

  deleteArr(i, data) {
    this.addArr.splice(i, 1);
  }

  updateDeleteArr(i, data) {
    if (this.GameId) {
      if (data._id) {
        this.viewArr.splice(i, 1);

        this.gameService.deleteByGameId(this.GameId, data._id).subscribe((res: any) => {
        })
      } else {
        this.addArr.slice(i, 1);
      }
    }
  }

}
