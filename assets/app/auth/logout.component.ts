import {Component} from "@angular/core";

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
	onLogout() {

	}
}