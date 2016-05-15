import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from "@angular/router";
import {HeaderComponent} from "./header.component";
import {GoodsComponent} from "./goods/goods-list.component";
import {OrderListComponent} from "./orders/order-list.component";
import {UserInfoComponent} from "./users/user-info.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {BasketComponent} from "./orders/basket.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {LoginComponent} from "./auth/login.component";
import {LogoutComponent} from "./auth/logout.component";

@Component({
    selector: 'b2b-portal',
    template: `
        <b2b-portal-header></b2b-portal-header>
        <div class="row">
            <div class="col-md-12">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})
@Routes([
    {path: '/goods', component: GoodsComponent},
    {path: '/order-list', component: OrderListComponent},
    {path: '/user-info', component: UserInfoComponent},
    {path: '/contacts', component: ContactsComponent},
    {path: '/basket', component: BasketComponent},
    {path: '/auth', component: AuthenticationComponent},
    {path: '/login', component: LoginComponent},
    {path: '/logout', component: LogoutComponent}
])
export class B2BPortalComponent {

    constructor(private _router: Router) {
    }

}