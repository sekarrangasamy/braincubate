import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { FilterService } from '../common/filter/filter.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LevelsService } from '../levels';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { DashboardService } from '../dashboard/dashboard.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;
  textValue: any;
  countryName: any;
  countries: any;
  countryId: any;
  userData: any;
  name: any;
  email: any;
  age: any;
  loginStatus: any;
  userStatus: any;
  level: any;
  countryData: any;
  startDate: any;
  endDate: any;
  searchQueryParams: any = {};
  isClicked = true;
  levelData: any;

  status_options = [
    {
      name: "Active",
      value: "ACTIVE"
    }, {
      name: "Inactive",
      value: "INACTIVE"
    }
  ];

  login_type = [
    {
      name: "Own",
      value: "OWN"
    }, {
      name: "FB",
      value: "FB"
    }, {
      name: "Google",
      value: "GOOGLE"
    }
  ];

  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  queryParams: any = {};
  queryCount: any;
  noResults: boolean;
  errorMsg: string;
  searchValue: any;
  noResult: boolean = false;
  noCountryResults: boolean = false;
  searchCountry: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private levelService: LevelsService,
    public toastr: ToastrManager,
    private dashboardService: DashboardService

  ) {
    this.queryParams = {
      offset: this.offset,
      limit: this.limit
    };
  }

  ngOnInit() {
    this.users();
    this.levels();
    this.country();
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      age: [''],
      login_type: [''],
      country: [''],
      status: [''],
      level: [''],
      start_date: [''],
      end_date: ['']
    })
  }

  loadPage(page: number) {
    this.page = page;
    this.offset = (this.page - 1) * this.limit;
    this.queryParams["offset"] = this.offset;
    this.users();
  }

  users() {
    this.userService.getUsers(this.queryParams).subscribe(res => {
      this.userData = res.response.users;
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

  onSelected(event: TypeaheadMatch) {
    this.searchValue = event.item._id;
  }

  change(value) {
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

  // country(value) {
  //   this.countryName = value;
  //   if (this.countryName != "") {
  //     this.userService.countryNameFilter(this.countryName).subscribe((res: any) => {
  //       this.countries = res.response;
  //       let element = this.countries.forEach(element => {
  //         if (this.countryName == element.name) {
  //           this.countryId = element._id;
  //         }
  //       });
  //     });
  //   }
  // }

  country() {
    this.userService.countryDetails().subscribe((res: any) => {
      this.countries = res.response.countries;
    })
  }
  onSelectedCountry(event: TypeaheadMatch) {
    this.searchCountry = event.item._id;
  }

  countryChange(value) {
    if (value == "") {
      this.country();
    } else {
      this.userService.countryNameFilter(value).subscribe((res: any) => {
        this.countries = res.response.countries;
      })
    }

  }

  countryNoResults(event: boolean): void {
    this.noCountryResults = event;
  }

  onChangeStatus(id) {
    let data = {
      "id": id
    };
    this.userService.getParticularUser(data).subscribe((res: any) => {
      console.log(res);
      if (res.meta.status == 200) {
        this.toastr.successToastr('Status Updated');
      }
    });
  }

  searchName() {
    if (this.textValue != "") {
      this.userService.nameFilter(this.textValue).subscribe((res: any) => {
        this.userData = res.response.users;
        this.queryCount = res.response.total;
        this.noResults = true;
        this.errorMsg = "Sorry, We couldn't find any results";
      });
    } else {
      this.users();
    }
  }

  search() {
    this.name = this.userForm.controls['name'].value;
    this.email = this.userForm.controls['email'].value;
    this.age = this.userForm.controls['age'].value;
    this.loginStatus = this.userForm.controls['login_type'].value;
    this.countryData = this.searchCountry;
    this.userStatus = this.userForm.controls['status'].value;
    this.level = this.searchValue;
    this.startDate = this.userForm.controls['start_date'].value;
    this.endDate = this.userForm.controls['end_date'].value;
    this.searchQueryParams = {};
    if (this.name) {
      this.searchQueryParams.name = this.name;
    }
    if (this.email) {
      this.searchQueryParams.email = this.email;
    }
    if (this.age) {
      this.searchQueryParams.age = this.age;
    }
    if (this.loginStatus) {
      this.searchQueryParams.provider = this.loginStatus;
    }
    if (this.countryData) {
      this.searchQueryParams.country = this.countryData;
    }
    if (this.userStatus) {
      this.searchQueryParams.status = this.userStatus;
    }
    if (this.level) {
      this.searchQueryParams.level = this.level;
    }
    if (this.startDate, this.endDate) {
      if (this.startDate > this.endDate) {
        this.toastr.warningToastr("End date should be grater then start date");
      } else {
        this.searchQueryParams.from = this.startDate;
        this.searchQueryParams.to = this.endDate;
      }
    }
    this.userService.filterUserData(this.searchQueryParams).subscribe(res => {
      this.userData = res.response.users;
      this.queryCount = res.response.total;
      this.noResults = true;
      this.errorMsg = "No Results Found";
    })
  }

  cancel() {
    this.userForm.reset();
    this.userForm
    this.users();
    this.country();
    this.levels();
    this.searchCountry = "";
    this.userForm.controls['login_type'].setValue('');
    this.userForm.controls['level'].setValue('');
    this.userForm.controls['status'].setValue('');
  }

  // toggle(){
  //   this.isClicked = !this.isClicked;
  // }

  open(dp) {
    dp.toggle()
  }

  open1(dp) {
    dp.toggle()
  }
}
