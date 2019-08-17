import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from './filter.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

	@Output('childEvent') childEvent = new EventEmitter();
	myForm: FormGroup;
	minDate: Date;
	maxDate: Date;
	startDate: Date;
	endDate: Date;
	groupByOption: Boolean = true;
	productDropdown: Boolean = true;
	erpCodeDropdown: Boolean = true;
	heatMapOption: Boolean = true;
	productionDropDownValue: Boolean = false;
	stageArr = [];
	defectArr = [];
	machineArr = [];
	productArr = [];
	customerArr = [];
	lossClassficationArr = [];
	dropdownSettings = {};
	stageDropdownSettings = {};
	defectDropdownSettings = {};
	machineDropdownSettings = {};
	customerDropdownSettings = {};
	productDropdownSettings = {};
	productDescDropdownSettings = {};
	filterValuesObject: any = {};
	productDescArr = [];
	erpCodeArr = [];
	erpDescArr = [];
	erpCodeDropdownSettings = {};
	erpDescDropdownSettings = {};
	groupByDropDown: any = [];
	lossDropDown = [{
		"name": "Date",
		"value": "day"
	}, {
		"name": "Material",
		"value": "material"
	}, {
		"name": "Stages",
		"value": "stage"
	}, {
		"name": "Loss Classification",
		"value": "loss_classification"
	}, {
		"name": "Machine",
		"value": "machine"
	}, {
		"name": "Customer",
		"value": "customer_name"
	}, {
		"name": "Product",
		"value": "item_code"
	}, {
		"name": "Loss",
		"value": "erp_code"
	}];

	prodDropDown = [{
		"name": "Date",
		"value": "day"
	}, {
		"name": "Stages",
		"value": "stage"
	}, {
		"name": "Machine",
		"value": "machine"
	}, {
		"name": "Customer",
		"value": "customer_name"
	}, {
		"name": "Product",
		"value": "item_code"
	}];

	constructor(
		private filterService: FilterService,
		private fb: FormBuilder,
		private router: Router
	) {
		this.filterService.switchEvent.subscribe((result) => {
			if (result) {
				this.groupByDropDown = this.prodDropDown;
				this.productionDropDownValue = true;
				this.filterValuesObject['material'] = [];
				this.filterValuesObject['loss_classification'] = [];
				this.filterValuesObject['erp_code'] = [];
				this.filterValuesObject['description'] = [];
				if ((this.filterValuesObject['group_by'] == 'material') ||
					(this.filterValuesObject['group_by'] == 'loss_classification') ||
					(this.filterValuesObject['group_by'] == 'erp_code')) {
					this.filterValuesObject['group_by'] = 'day';
					this.filterValuesObject['sub_group_by'] = 'day';
				}
			} else {
				this.groupByDropDown = this.lossDropDown;
				this.productionDropDownValue = false;
			}
		});
	}

	ngOnInit() {
		this.dateFilters();
		this.stageFilters();
		this.defectFilters();
		this.lossClassficationFilter();
		this.machineFilter();
		this.customerFilter();
		this.productFilter();
		this.productDescFilter();
		this.erpCodeFilter();
		this.erpDescFilter();
		this.groupByDropDown = this.lossDropDown;
		this.productionDropDownValue = false;
		if (this.router.url == '/run-chart' || this.router.url == '/spc-chart' || this.router.url == '/box-plot-chart') {
			this.groupByOption = false;
		} else if (this.router.url == '/trend-chart' || this.router.url == '/bubble-chart' || this.router.url == '/radar-chart') {
			this.groupByOption = false;
			this.filterValuesObject['group_by'] = 'stage';
		} else if (this.router.url == '/dashboard') {
			this.filterValuesObject['group_by'] = 'day';
			this.filterValuesObject['sub_group_by'] = 'day';
		} else if (this.router.url == '/pareto-chart') {
			this.groupByOption = false;
			this.filterValuesObject['group_by'] = 'description';
		} else if (this.router.url == '/heat-map-chart') {
			this.groupByOption = false;
			this.heatMapOption = false;
			this.filterValuesObject['group_by'] = 'stage';
		}
	}

	dateFilters() {
		this.filterService.txnDateFilter().subscribe((dateFilter: any) => {
			if (dateFilter.response.length > 0) {
				let dateOffset = (24 * 60 * 60 * 1000) * 14; //14 days
				this.filterValuesObject['end_date'] = this.getLatestDate(dateFilter.response);
				this.maxDate = this.filterValuesObject['end_date'];
				this.minDate = this.getOldDate(dateFilter.response);
				let myDate = new Date(this.filterValuesObject['end_date']);
				let endDate = myDate.setTime(myDate.getTime() - dateOffset);
				this.filterValuesObject['start_date'] = new Date(endDate);
				this.startDate = new Date(endDate);
				this.endDate = this.filterValuesObject['end_date'];
			}
		})
	}

	defectFilters() {
		this.filterService.getDefectFilter().subscribe((defectFilter: any) => {
			this.defectArr = defectFilter.response;
			this.defectDropdownSettings = {
				singleSelection: false,
				idField: 'material',
				textField: 'material',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	stageFilters() {
		this.filterService.stageFilter().subscribe((stageFilter: any) => {
			this.stageArr = stageFilter.response;
			this.stageDropdownSettings = {
				singleSelection: false,
				idField: 'stage',
				textField: 'stage',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	lossClassficationFilter() {
		this.filterService.lossClassficationFilter().subscribe((lossClassficationFilter: any) => {
			this.lossClassficationArr = lossClassficationFilter.response;
			this.dropdownSettings = {
				singleSelection: false,
				idField: 'loss_classification',
				textField: 'loss_classification',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	machineFilter() {
		this.filterService.machineFilter().subscribe((machineFilter: any) => {
			this.machineArr = machineFilter.response;
			this.machineDropdownSettings = {
				singleSelection: false,
				idField: 'machine',
				textField: 'machine',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	customerFilter() {
		this.filterService.customerFilter().subscribe((customerFilter: any) => {
			this.customerArr = customerFilter.response;
			this.customerDropdownSettings = {
				singleSelection: false,
				idField: 'customer_name',
				textField: 'customer_name',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	productFilter() {
		this.filterService.productFilter().subscribe((productFilter: any) => {
			this.productArr = productFilter.response;
			this.productDropdownSettings = {
				singleSelection: false,
				idField: 'item_code',
				textField: 'item_code',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	productDescFilter() {
		this.filterService.productDescription().subscribe((productDescription: any) => {
			this.productDescArr = productDescription.response;
			this.productDescDropdownSettings = {
				singleSelection: false,
				idField: 'item_description',
				textField: 'item_description',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	erpCodeFilter() {
		this.filterService.erpCodeFilter().subscribe((erpCode: any) => {
			this.erpCodeArr = erpCode.response;
			this.erpCodeDropdownSettings = {
				singleSelection: false,
				idField: 'erp_code',
				textField: 'erp_code',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	erpDescFilter() {
		this.filterService.descriptionFilter().subscribe((erpDesc: any) => {
			this.erpDescArr = erpDesc.response;
			this.erpDescDropdownSettings = {
				singleSelection: false,
				idField: 'description',
				textField: 'description',
				selectAllText: 'Select All',
				unSelectAllText: 'Unselect All',
				itemsShowLimit: 3,
				allowSearchFilter: true
			};
		})
	}

	getLatestDate(data) {
		// convert to timestamp and sort
		var sorted_ms = data.map(function (item) {
			return new Date(item.txn_date).getTime()
		}).sort();
		// take latest
		var latest_ms = sorted_ms[sorted_ms.length - 1];
		// convert to js date object
		return new Date(latest_ms);
	}

	getOldDate(data) {
		var sorted_ms = data.map(function (item) {
			return new Date(item.txn_date).getTime()
		}).sort();
		var old_ms = sorted_ms[0];
		return new Date(old_ms);
	}

	onFromDateChange(startDate) {
		if (!moment(startDate).isSame(moment(this.startDate))) {
			this.startDate = startDate;
			this.onChange();
		}
	}

	onToDateChange(endDate) {
		if (!moment(endDate).isSame(moment(this.endDate))) {
			this.endDate = endDate;
			this.onChange();
		}
	}

	onChange() {
		let object = {};
		let keys = Object.keys(this.filterValuesObject);
		if (this.filterValuesObject['sub_group_by'] == '') {
			this.filterValuesObject['sub_group_by'] = 'day'
		}

		if (this.router.url == '/dashboard') {
			if (this.filterValuesObject.group_by != 'day')
				this.filterValuesObject['sub_group_by'] = '';
		}

		if (this.filterValuesObject.group_by == 'material') {
			this.filterValuesObject['material'] = [];
		} else if (this.filterValuesObject.group_by == 'stage') {
			this.filterValuesObject['stage'] = [];
		} else if (this.filterValuesObject.group_by == 'loss_classification') {
			this.filterValuesObject['loss_classification'] = [];
		} else if (this.filterValuesObject.group_by == 'machine') {
			this.filterValuesObject['machine'] = [];
		} else if (this.filterValuesObject.group_by == 'customer_name') {
			this.filterValuesObject['customer_name'] = [];
		} else if (this.filterValuesObject.group_by == 'item_code') {
			this.filterValuesObject['item_code'] = [];
		} else if (this.filterValuesObject.group_by == 'erp_code') {
			this.filterValuesObject['erp_code'] = [];
		}

		for (var i in keys) {
			if (keys[i] == 'group_by' || keys[i] == 'sub_group_by') {
				object[keys[i]] = this.filterValuesObject[keys[i]];
			} else if (this.filterValuesObject[keys[i]] != null && this.filterValuesObject[keys[i]] != undefined && this.filterValuesObject[keys[i]].length > 0) {
				object[keys[i]] = JSON.stringify(this.filterValuesObject[keys[i]]);
			} else if (keys[i] == 'start_date' || keys[i] == 'end_date') {
				object[keys[i]] = this.filterValuesObject[keys[i]];
			}
		}
		this.childEvent.next(object);
	}

	onProductDropdownChange(value) {
		if (value == true) {
			this.productDropdown = true;
			this.filterValuesObject['item_description'] = [];
			this.onChange();
		} else {
			this.productDropdown = false;
			this.filterValuesObject['item_code'] = [];
			this.onChange();
		}
	}

	onerpCodeDropdownChanges(value) {
		if (value) {
			this.erpCodeDropdown = true;
			this.filterValuesObject['description'] = [];
			this.onChange();
		} else {
			this.erpCodeDropdown = false;
			this.filterValuesObject['erp_code'] = [];
			this.onChange();
		}
	}

}
