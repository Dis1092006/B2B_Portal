import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes} from "@angular/router";
import {LoginComponent} from "./login.component";
import {LogoutComponent} from "./logout.component";

@Component({
	selector: 'b2b-auth',
	template: `
		<header class="row spacing">
		
		</header>
		<div class="row spacing">
			<router-outlet></router-outlet>
		</div>
	`,
	directives: [ROUTER_DIRECTIVES]
})
@Routes([
	{path: '/login', component: LoginComponent},
	{path: '/logout', component: LogoutComponent}
])
export class AuthenticationComponent {

}