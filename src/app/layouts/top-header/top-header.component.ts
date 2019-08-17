import { Component, ElementRef, OnInit, Output, ViewEncapsulation, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutService } from '../layout.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../../dashboard/dashboard.service';
import { FilterService } from '../../common/filter/filter.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var Highcharts: any;

import {
	Principal,
	AuthServerProvider
} from '../../shared';
import { componentHostSyntheticProperty } from '@angular/core/src/render3';

@Component({
	selector: 'app-top-header',
	templateUrl: './top-header.component.html',
	styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {
	status: boolean = false;
	myForm: FormGroup;
	account: any = {};
	lossDetails: any;
	fileToUpload: any;
	url: any;
	uploadedFile = {};
	IsmodelShow = false;
	productDropdown = 0;
	switchShow: Boolean = false;
	switchAction: Boolean = false;
	admin:any;

	constructor(private principal: Principal,
		private auth: AuthServerProvider,
		private layoutService: LayoutService,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private spinner: NgxSpinnerService,
		private router: Router, public elRef: ElementRef,
		private dashboardService: DashboardService,		
		public toastr: ToastrManager,
		private filterService: FilterService
	) { }

	ngOnInit() {
		this.admin=localStorage.getItem("username");
		if (this.router.url == '/run-chart' || this.router.url == '/dashboard') {
			this.switchShow = true
		}
		this.principal.identity().then((account) => {
			this.account = account;
		});
		this.myForm = this.fb.group({});
	}

	clickEvent() {
		this.status = !this.status;
	}

	hideNavbar() {
		var activeNavbar = this.elRef.nativeElement.querySelector('.is-active');
		for (var i = 0; i < Highcharts.charts.length; i++) {
			if (Highcharts.charts[i]) {
				var chartId = Highcharts.charts[i].renderTo.id;
				if (chartId != undefined) {
					Highcharts.charts[i].reflow();
				}
			}
		}
		setTimeout(() => {
			window.dispatchEvent(new Event('resize'));
		}, 200);
	}

	logout() {
		localStorage.clear();
		this.router.navigate(['/login']);
	}

	onProfitSelectionChange(entry): void {
		this.productDropdown = entry;
	}

	onFileChange(event) {
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.url = reader.result;
				this.myForm.patchValue({
					file: reader.result
				});
				this.fileToUpload = file;
				this.cd.markForCheck();
			}
			this.spinner.show()
			setTimeout(() => {
				this.spinner.hide();
			}, 3000);;
		}
	}

	onFileUpload(fileUploads) {
		this.spinner.show();
		this.onFileChange(event);
		this.layoutService.importLossData(this.fileToUpload, this.productDropdown)
			.subscribe((response) => {
				this.spinner.hide();
				this.showSuccess();
				this.IsmodelShow = true;
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}, (error) => {
				this.showError();
				console.log("please check data");
			})
	}

	changeSwitch(event) {}

	showSuccess() {
		this.toastr.successToastr('File uploaded successfully.', 'Success!', {
			showCloseButton: true
		});
	}

	showError() {
		this.toastr.errorToastr('Check your uploadded file.', 'Error', {
			showCloseButton: true
		});
	}

}
