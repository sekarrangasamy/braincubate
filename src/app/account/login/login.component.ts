import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	authenticationError: boolean;
	email: any;
	password: any;

	constructor(
		private router: Router,
		private renderer: Renderer2,
		private loginService: LoginService,
		public toastr: ToastrManager,
	) {
		this.renderer.addClass(document.body, 'bg-img');
		this.authenticationError = false;
	}

	ngOnInit() { 
		var token=localStorage.getItem('access_token');
		if(token){
			this.router.navigate(['dashboard']);
		}else{
			this.router.navigate(['login']);
		}
	}

	login() {
		this.loginService.login({
			username: this.email,
			password: this.password
		}).then((res:any) => {
			this.authenticationError = false;
			if (this.router.url === '/login') {
				this.router.navigate(['dashboard']);
			}
		}).catch((error) => {
			this.authenticationError = true;
			this.toastr.warningToastr('Invalid username or password');
		})
	}

	ngOnDestroy() {
		this.renderer.removeClass(document.body, 'bg-img');
	}
}
