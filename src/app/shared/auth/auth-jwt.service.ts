import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthServerProvider {
	constructor(
		private http: HttpClient
	) { }

	getToken() {
		return localStorage.getItem('access_token');
	}

	login(credentials): Observable<any> {
		const data = {
			username: credentials.username,
			password: credentials.password
		};

		return this.http.post(environment.resourceUrl + '/superadmin/login', data, { observe: 'response' }).map(authenticateSuccess.bind(this));

		function authenticateSuccess(response) {
			const jwt = response.body.response.access_token;
			this.storeAuthenticationToken(jwt);
			const refresh_token = response.body.response.refresh_token;
			this.storeAuthenticationTokenLogin(refresh_token);
			return jwt;
		}
	}

	refreshToken(): Observable<any> {
		const data = {
			username: localStorage.getItem('username'),
			refresh_token: localStorage.getItem('refresh_token')
		};
		return this.http.post(environment.resourceUrl + '/superadmin/refresh-token', data, { observe: 'response' }).map(authenticateSuccess.bind(this));

		function authenticateSuccess(resp) {
			const jwt = resp.body.response.access_token;
			this.storeAuthenticationToken(jwt);
			return jwt;
		}
	}

	storeAuthenticationUsername(username) {
		localStorage.setItem("username", username);
	}

	storeAuthenticationToken(jwt) {
		localStorage.setItem("access_token", jwt);
	}

	storeAuthenticationTokenLogin(jwt) {
		localStorage.setItem("refresh_token", jwt);
	}

	logout(): Observable<any> {
		const data = {
			username: localStorage.getItem('username'),
			refresh_token: localStorage.getItem('refresh_token')
		};
		return this.http.post(environment.resourceUrl + '/superadmin/logout', data, { observe: 'response', responseType: 'text' })
			.map(logoutSuccess.bind(this));

		function logoutSuccess(resp) {
			this.refreshToken();
			localStorage.clear();
			return resp;
		}
	}
}