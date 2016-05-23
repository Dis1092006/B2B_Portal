import {Component, OnInit} from "@angular/core";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";
import {Router} from "@angular/router";
import {User} from "./user";
import {AuthService} from "./auth.service";
import {ErrorService} from "../errors/error.service";

@Component({
	selector: 'b2b-portal-login',
	template: `
		<section class="col-md-4 col-md-offset-4">
			<h2>Вход</h2>
			<form [ngFormModel]="loginForm" (ngSubmit)="onSubmit()">
				<div class="form-group">
					<label for="user">Имя</label>
					<input [ngFormControl]="loginForm.find('user')" type="text" id="user" class="form-control">
				</div>
				<div class="form-group">
					<label for="password">Пароль</label>
					<input [ngFormControl]="loginForm.find('password')" type="password" id="password" class="form-control">
				</div>
				<button type="submit" class="btn btn-large btn-primary" [disabled]="!loginForm.valid">Войти</button>
			</form>
		</section>
	`
})
export class LoginComponent implements OnInit {
	loginForm: ControlGroup;

	constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router, private _errorService: ErrorService) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			user: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onSubmit() {
		const user = new User(this.loginForm.value.user, this.loginForm.value.password);
		this._authService.login(user)
			.subscribe(
				data => {
					console.log(JSON.stringify(data));
					localStorage.setItem('token', data.token);
					localStorage.setItem('userId', data.userId);
					this._router.navigateByUrl('/');
				},
				error => this._errorService.handleError(error)
			);
	}
}