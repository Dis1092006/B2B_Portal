import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Component({
	selector: 'b2b-portal-logout',
	template: `
		<section class="col-md-4 col-md-offset-4">
			<h2>Выход</h2>
			<button class="btn btn-danger" (click)="onLogout()">Выход</button>
		</section>
	`
})
export class LogoutComponent {
	constructor(private _authService: AuthService, private _router: Router) { }

	onLogout() {
		this._authService.logout();
		this._router.navigate(['login']);
	}
}