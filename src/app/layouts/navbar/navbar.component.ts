import { Component, ElementRef, OnInit } from '@angular/core';
declare var $: any;
declare var Highcharts: any;

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	constructor(public elRef: ElementRef) { }

	ngOnInit() {
		$.getScript('./assets/app/js/core/app-menu.js');
		$.getScript('./assets/app/js/core/app.js');
		this.resetChartWidth();
	}

	resetChartWidth() {
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
}
