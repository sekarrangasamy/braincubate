import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import * as Highcharts from 'highcharts';
import * as Highcharts from "highcharts/highstock";


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	usersCount: number;
	levelsCount: number;
	gamesCount: number;
	announcementsCount: number;
	achievementsCount: number;
	dateRangeForm: FormGroup;
	dateRange: Date;
	options: any;
	pie_options: any;
	isLoading = false;
	filterParams = {};
	ini_start_date: any;
	ini_end_date: any;
	bsValue = new Date();
	bsRangeValue: Date[];
	maxDate = new Date();
	data: Date;
	date1: any;
	date2: any;
	innerWidth: any;
	optionschart: any;
	testLimi: any;
	testLimit2: any;
	isOpen = false;





	constructor(private dashboardService: DashboardService, private fb: FormBuilder) { }

	ngOnInit() {
		var date = new Date();
		
		this.dashboardService.getAllCount().subscribe(result => {
			if (result && result.response) {
				this.usersCount = result.response.users;
				this.levelsCount = result.response.levels;
				this.gamesCount = result.response.games;
				this.announcementsCount = result.response.announcements;
				this.achievementsCount = result.response.achievements;
			}
		});


	
		this.dateRangeForm = this.fb.group({
			range: null
		})

		//set Initial Date

		//To show start date of current month
		// this.maxDate.setDate(this.maxDate.getDate() - (this.maxDate.getDate() - 1));

		//To Show 30 days before current date
		this.maxDate.setDate(this.maxDate.getDate() - 30);

		this.dateRangeForm.patchValue({
			range: [this.maxDate, date]
		})

		//initial date ends

		
	}


	// onResize(event) {

	// 	var chart =Highcharts.chart('container',this.options);
	// 	this.innerWidth=window.innerWidth;
	// 	this.options.chart.width=this.innerWidth - 100;
	// 	Highcharts.chart('container',this.options)
	//   }


	onValueChange(event: Date) {
		this.isLoading = true;

		let created_date = [];
		let android_count = [];
		let ios_count = [];
		let dates = [];
		let android_users = [];
		let ios_users = [];
		let provider_data = [];

		if (event != this.data) {
			this.data = event ? event : void 0;
			this.date1 = this.data[0];
			this.date2 = this.data[1];
		}
		//start Date
		let start_month = ("0" + (this.date1.getMonth() + 1)).slice(-2);
		let start_day = ("0" + (this.date1.getDate())).slice(-2)
		let start_date = [this.date1.getFullYear(), start_month, start_day].join("-");


		//End Date
		let end_month = ("0" + (this.date2.getMonth() + 1)).slice(-2);
		let end_day = ("0" + (this.date2.getDate())).slice(-2)
		let end_date = [this.date2.getFullYear(), end_month, end_day].join("-");

		this.filterParams['from'] = start_date;
		this.filterParams['to'] = end_date;

		this.dashboardService.getReport(this.filterParams).subscribe((res: any) => {
			created_date = res.response.created_at;
			android_count = res.response.android;
			ios_count = res.response.ios;
			var arr = Object.keys(created_date).map(key => ({ type: key, value: created_date[key] }));

			arr.forEach((res: any) => {
				dates.push(res.value);
			})


			var arr1 = Object.keys(android_count).map(key => ({ type: key, value: android_count[key] }));

			arr1.forEach((res: any) => {
				android_users.push(res.value);
			})

			var arr2 = Object.keys(ios_count).map(key => ({ type: key, value: ios_count[key] }));

			arr2.forEach((res: any) => {
				ios_users.push(res.value);
			})

			this.options = {
				chart: {
					type: 'column',
					// width:this.innerWidth - 50
				},
				title: {
					text: 'User Device Register'
				},
				subtitle: {
					text: 'Android vs IOS',
					align: 'center'
				},
				xAxis: {
					categories: dates,
					crosshair: true
				},
				yAxis: {
					min: 0,
					allowDecimals:false,
					title: {
						text: 'Number of users'
					}
				},
				tooltip: {
					headerFormat: '<span style="font-size:10px">Date:{point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y} users</b></td></tr>',
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
				series: [{
					name: 'Android',
					data: android_users,
					color: '#A4C639'

				}, {
					name: 'IOS',
					data: ios_users,
					color: '#2E3033'

				}],
				responsive: {
					rules: [
						{
							condition: {
								// maxWidth:500 
							},
							chartOptions: {

							}
						}
					]
				},
				credits: {
					enabled: false
				}
			}

			let chart = Highcharts.chart('container', this.options);
			chart.reflow();
			chart.redraw();
			// chart.setSubtitle({
			// 	text: '<i style="color:#A4C639;font-size:25px"class="fa fa-android" aria-hidden="true"></i>  <span style="color:black;font-size:10px"> vs</span>  <i style="color:#2E3033;font-size:25px" class="fa fa-apple" aria-hidden="true"></i>' ,
			// 	useHTML:true,
			// 	align:"center"
			// })



		}, error => {
			console.log(error);
		});

		var getColor = {
			'GOOGLE': '#4285F4',
			'FB': '#3C5A99',
			'OWN': '#CECEFF',
		};
		this.dashboardService.getReport1(this.filterParams).subscribe((res: any) => {
			provider_data = res.response.providerCount;
			var arr = Object.keys(provider_data).map(key => ({ name: provider_data[key].name, y: provider_data[key].count, color: getColor[provider_data[key].name] }));
			let name = [];
			let count = [];

			provider_data.forEach((res: any) => {
				name.push(res.name);
				count.push(res.count);
			})

			this.pie_options = {
				chart: {
					type: 'pie',
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
				},
				title: {
					text: 'Provider Counts'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.y}</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.y}',

						},
						showInLegend: true
					}
				},

				series: [{
					name: 'Provider Counts',
					colorByPoint: true,
					data: arr
				}],
				credits: {
					enabled: false
				},
				responsive: true
			}

			let chart = Highcharts.chart('pie-container', this.pie_options);
			chart.reflow();
			chart.redraw();
		})
	}



}
