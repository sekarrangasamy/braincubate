import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FilterService {

	private resourceUrl = environment.resourceUrl;
	switchEvent: Subject<any> = new Subject();

	constructor(private http: HttpClient) { }

	public getDefectFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=material')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public stageFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=stage')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public lossClassficationFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=loss_classification')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public machineFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=machine')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public customerFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=customer_name')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public productFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=item_code')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public productDescription(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=item_description')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public txnDateFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=txn_date')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public erpCodeFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=erp_code')
			.map((response: Response) => {
				return <any>response;
			})
	}

	public descriptionFilter(): Observable<any> {
		return this.http.get(this.resourceUrl + '/product-loss-data/filters?group_by=description')
			.map((response: Response) => {
				return <any>response;
			})
	}

	emitSwitchEvent(event: any) {
		this.switchEvent.next(event);
	}


}
