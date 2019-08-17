import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class LayoutService {

	private resourceUrl = environment.resourceUrl;

	constructor(private http: HttpClient) { }

	public importLossData(file, data: any): Observable<any> {
		let url: any;
		var formData = new FormData();
		formData.append('file', file);
		formData.append('type', data);
		if (data == 0)
			url = "/product-loss-data";
		else
			url = "/loss-master";
		return this.http.post(this.resourceUrl + url, formData).map((response: Response) => {
			return <any>response;
		})
	}
}
