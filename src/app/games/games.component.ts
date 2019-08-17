import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GamesService } from './games.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Config } from '../config/config';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LevelsService } from '../levels';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { DashboardService } from '../dashboard/dashboard.service';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  gameForm: FormGroup;
  textValue: any;
  gameData: any;
  name: any;
  level: any;
  searchQueryParams: any = {};
  textLimit: any = Config.maxChars;
  maxDate = new Date();
  levelData: any;

  gameScoreForm: FormGroup;
  particularGameData: any;
  gameDataValue: any;
  flagValue: any;
  GameId: any;
  img_url: any;
  bg_url: any;
  icon: any;
  bg_img: any;
  icon_name: any;
  bg_name: any;
  inst_url: any;
  inst_icon: any;
  inst_name: any;
  game_icon_name: any;

  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  queryParams: any = {};
  queryCount: any;
  noResults: boolean;
  errorMsg: string;
  levelsCount: any;
  searchValue: any;
  noResult: boolean=false;
  isClicked: boolean=true;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GamesService,
    private levelService: LevelsService,
    public toastr: ToastrManager,
    private cd: ChangeDetectorRef,
    private dashboardService: DashboardService
  ) {
    this.queryParams = {
      offset: this.offset,
      limit: this.limit
    };
  }

  ngOnInit() {
    this.dashboardService.getAllCount().subscribe((res => {
      this.levelsCount = res.response.levels;
    }));
    this.games();
    this.levels();
    this.gameForm = this.formBuilder.group({
      name: [''],
      level: ['']
    })

    this.gameScoreForm = this.formBuilder.group({
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
    this.games();
  }

  games() {
    this.flagValue = 'default';
    this.gameService.getGames(this.queryParams).subscribe(res => {
      this.gameData = res.response.games;
      this.queryCount = res.response.total;
      if (this.queryCount == 0) {
        this.noResults = true;
        this.errorMsg = "Data not available";
      }
    })
  }

  levels() {
    let queryParams = {
      limit: this.limit,
      offset: this.offset
    }
    this.levelService.getLevels(queryParams).subscribe(res => {
      this.levelData = res.response.levels;
    });
  }

  searchName() {
    if (this.textValue != "") {
      this.gameService.nameFilter(this.textValue).subscribe((res: any) => {
        this.gameData = res.response.games;
        this.queryCount = res.response.total;
        this.noResults = true;
        this.errorMsg = "Sorry, We couldn't find any results";
      });
    } else {
      this.games();
    }
  }

  onSelected(event:TypeaheadMatch) {
    this.searchValue = event.item._id;
  }

  change(value) {
    console.log(value);
    if (value == "") {
      this.levels();
    } else {
      this.levelService.nameFilter(value).subscribe((res: any) => {
        this.levelData = res.response.levels;
      })
    }

  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }
  search() {
    this.name = this.gameForm.controls['name'].value;
    // this.level = this.gameForm.controls['level'].value;
    this.level = this.searchValue;

    this.searchQueryParams = {};
    if (this.name) {
      this.searchQueryParams.name = this.name;
    }
    if (this.level) {
      this.searchQueryParams.level = this.level;
    }
    this.gameService.filterGameData(this.searchQueryParams).subscribe(res => {
      this.gameData = res.response.games;
      this.noResults = true;
      this.errorMsg = "No Results Found" 
    })
  }

  cancel() {
    this.gameForm.reset();
    this.games();
    this.gameForm.controls['level'].setValue('');
    this.searchValue="";
    this.levels();
  }

  editScoreForm(game) {
    this.flagValue = 'editScore';
    this.particularGameData = game;
    this.gameScoreForm.controls['accuracy'].setValue(this.particularGameData.score.accuracy);
    this.gameScoreForm.controls['concentration'].setValue(this.particularGameData.score.concentration);
    this.gameScoreForm.controls['memory'].setValue(this.particularGameData.score.memory);
    this.gameScoreForm.controls['problem_solving'].setValue(this.particularGameData.score.problem_solving);
    this.gameScoreForm.controls['speed'].setValue(this.particularGameData.score.speed);
    this.gameScoreForm.controls['visual'].setValue(this.particularGameData.score.visual);
  }

  saveScoreForm(game) {
    this.gameDataValue = game;
    this.GameId = game._id;
    var obj = {
      "name": this.gameDataValue.name,
      "desc": this.gameDataValue.desc,
      "level": this.gameDataValue.level._id,
      "level_position": this.gameDataValue.level_position,
      "game_time_in_sec": this.gameDataValue.game_time_in_sec,
      "question_time_in_sec": this.gameDataValue.question_time_in_sec,
      "difficulty": this.gameDataValue.difficulty,
      "speed": this.gameScoreForm.controls['speed'].value,
      "memory": this.gameScoreForm.controls['memory'].value,
      "concentration": this.gameScoreForm.controls['concentration'].value,
      "problem_solving": this.gameScoreForm.controls['problem_solving'].value,
      "accuracy": this.gameScoreForm.controls['accuracy'].value,
      "visual": this.gameScoreForm.controls['visual'].value
    }
    this.gameService.updateGameView(this.GameId, obj, this.icon, this.bg_img).subscribe(res => {
      if (res.meta.status == 200) {
        this.toastr.successToastr(res.meta.msg);
        this.games();
      }
    })
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
          this.gameScoreForm.patchValue({
            file: reader.result
          });
          this.icon = file;
          this.game_icon_name = file.name;
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
          this.gameScoreForm.patchValue({
            file: reader.result
          });
          this.bg_img = file;
          this.bg_name = file.name;
          this.cd.markForCheck();
        };
      }
    }
  }

  onInstructionImageUpload(event) {
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
          this.inst_url = reader.result;
          this.gameScoreForm.patchValue({
            file: reader.result
          });
          this.inst_icon = file;
          this.inst_name = file.name;
          this.cd.markForCheck();
        };
      }
    }
  }

  toggle(){
    this.isClicked = !this.isClicked;
  }
}
