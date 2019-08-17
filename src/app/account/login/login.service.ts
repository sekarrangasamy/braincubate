import { Injectable } from '@angular/core';

import {
	Principal,
	AuthServerProvider
} from '../../shared';

@Injectable()
export class LoginService {

	constructor(
		private principal: Principal,
		private authServerProvider: AuthServerProvider
	) { }

	login(credentials, callback?) {
		const cb = callback || function () { };

		return new Promise((resolve, reject) => {
			this.authServerProvider.login(credentials).subscribe((data) => {
				this.principal.identity(true).then((account) => {
					if (account !== null) {
						// console.log(account.langKey);
					}
					resolve(data);
				});
				resolve(data);
				return cb();
			}, (err) => {
				reject(err);
				return cb(err);
			});
		});
	}

	logout() {
		this.authServerProvider.logout().subscribe();
		this.principal.authenticate(null);
	}
}