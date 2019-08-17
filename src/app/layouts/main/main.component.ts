import { Component, OnInit } from '@angular/core';
import { Principal } from '../../shared/auth/principal.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	isAuthenticated: boolean = false;

	constructor(private principal: Principal, private router: Router) {
	}

	ngOnInit() {
		this.principal.identity().then((account) => {
			if (account) {
				this.isAuthenticated = true;
			} else {
				this.isAuthenticated = false;
			}
		});

		if (this.router.url == '/') {
			this.router.navigate(['/login'])
		}
	}

}
