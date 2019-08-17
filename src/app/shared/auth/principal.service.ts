import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AccountService } from './account.service';
import { AuthServerProvider } from './auth-jwt.service';

@Injectable()
export class Principal {
	private userIdentity: any;
	private role: number = 4;
	private authenticated = false;
	private authenticationState = new Subject<any>();

	constructor(
		private account: AccountService,
		private auth: AuthServerProvider
	) { }

	authenticate(identity) {
		this.userIdentity = identity;
		this.authenticated = identity !== null;
		this.authenticationState.next(this.userIdentity);
	}

	hasAnyAuthority(authorities: string[]): Promise<boolean> {
		return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
	}

	hasAnyAuthorityDirect(authorities: string[]): boolean {
		return true;
		/* if (!this.authenticated || !this.userIdentity) {
			return false;
		}

		for (let i = 0; i < authorities.length; i++) {
			if (this.role === this.userIdentity.role) {
				return true;
			}
		}

		return false; */
	}

	hasAuthority(authority: string): Promise<boolean> {
		if (!this.authenticated) {
			return Promise.resolve(false);
		}

		return this.identity().then((id) => {
			return Promise.resolve(id.authorities && id.authorities.includes(authority));
		}, () => {
			return Promise.resolve(false);
		});
	}

	identity(force?: boolean): Promise<any> {
		if (force === true) {
			this.userIdentity = undefined;
		}

		// check and see if we have retrieved the userIdentity data from the server.
		// if we have, reuse it by immediately resolving
		if (this.userIdentity) {
			return Promise.resolve(this.userIdentity);
		}

		// retrieve the userIdentity data from the server, update the identity object, and then resolve.
		return this.account.get().toPromise().then((response) => {
			const account = response.body.response;
			if (account) {
				this.auth.storeAuthenticationUsername(account[0].username);				
				this.userIdentity = account;
				this.authenticated = true;
			} else {
				this.userIdentity = null;
				this.authenticated = false;
			}
			this.authenticationState.next(this.userIdentity);
			return this.userIdentity;
		}).catch((err) => {
			this.userIdentity = null;
			this.authenticated = false;
			this.authenticationState.next(this.userIdentity);
			return null;
		});
	}

	isAuthenticated(): boolean {
		return this.authenticated;
	}

	isIdentityResolved(): boolean {
		return this.userIdentity !== undefined;
	}

	getAuthenticationState(): Observable<any> {
		return this.authenticationState.asObservable();
	}

	getImageUrl(): String {
		return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
	}
}
