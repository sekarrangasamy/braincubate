import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { AuthServerProvider } from "../../shared";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private refreshTokenInProgress = false;
	// Refresh Token Subject tracks the current token, or is null if no token is currently
	// available (e.g. refresh pending).
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(
		public auth: AuthServerProvider
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		request = this.addAuthenticationToken(request);

		return next.handle(request).catch((error) => {

			if (request.url.includes("login") || request.url.includes("refresh-token")) {
				return Observable.throw(error);
			}

			if (error.status !== 401) {
				return Observable.throw(error);
			}

			if (this.refreshTokenInProgress) {
				return this.refreshTokenSubject
					.filter(result => result !== null)
					.take(1)
					.switchMap(() => next.handle(this.addAuthenticationToken(request)));
			} else {
				this.refreshTokenInProgress = true;

				this.refreshTokenSubject.next(null);

				return this.auth
					.refreshToken()
					.switchMap((token: any) => {
						//When the call to refreshToken completes we reset the refreshTokenInProgress to false
						// for the next time the token needs to be refreshed
						this.refreshTokenInProgress = false;
						this.refreshTokenSubject.next(token);

						return next.handle(this.addAuthenticationToken(request));
					})
					.catch((err: any) => {
						this.refreshTokenInProgress = false;

						this.auth.logout();
						return Observable.throw(error);
					});
			}
		});
	}

	addAuthenticationToken(request) {
		// Get access token from Local Storage
		const accessToken = this.auth.getToken();

		// If access token is null this means that user is not logged in
		// And we return the original request
		if (!accessToken) {
			return request;
		}

		// We clone the request, because the original request is immutable
		return request.clone({
			withCredentials: true,
			setHeaders: {
				Authorization: 'Bearer ' + accessToken
			}
		});
	}
}
