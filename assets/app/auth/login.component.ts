import {Component, OnInit} from "@angular/core";
import {ControlGroup, FormBuilder, Validators} from "@angular/common";

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
export class LoginComponent implements OnInit{
	loginForm: ControlGroup;

	constructor(private _fb: FormBuilder) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			user: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onSubmit() {
		console.log(this.loginForm.value);
	}

}