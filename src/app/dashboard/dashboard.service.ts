import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

	private baseUrl = environment.resourceUrl;
	resourceUrl: string = `${environment.resourceUrl}/product-loss-data/graph`;
	resourceProductUrl: string = `${environment.resourceUrl}/product-loss-data/top-listings`;
	switchEvent: Subject<any> = new Subject();

	constructor(private http: HttpClient) { }

	public barChart(req?: any): Observable<any> {
		return this.http.get<any>(this.resourceUrl, { params: req })
	}

	public stageWiseDonutChart(req?: any): Observable<any> {
		return this.http.get<any>(this.resourceUrl, { params: req })
	}

	public productWiseDonutChart(req?: any): Observable<any> {
		// return this.http.get<any>(this.resourceProductUrl, { params: req })
		return this.http.get<any>(this.resourceUrl, { params: req })
	}

	public getAllCount() : Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/reports/stats`);
	}

	public getReport(paramss) : Observable<any>{
		return this.http.get(`${this.baseUrl}/reports/device-registration/stats`,{params : paramss});
	}

	public getReport1(params) : Observable<any>{
		return this.http.get(`${this.baseUrl}/reports/provider-stats`,{params:params});
	}

	emitSwitchEvent(event: any) {
		this.switchEvent.next(event);
	}
}
