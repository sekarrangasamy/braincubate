import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class AccountService {
	constructor(private http: HttpClient) { }

	get(): Observable<HttpResponse<any>> {
		return this.http.get<Account>(environment.resourceUrl + '/superadmin/me', { observe: 'response' });
	}
}
