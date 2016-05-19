import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from "@angular/router";
import {HeaderComponent} from "./header.component";
import {GoodsListComponent} from "./goods/goods-list.component";
import {OrderListComponent} from "./orders/order-list.component";
import {UserInfoComponent} from "./users/user-info.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {BasketComponent} from "./orders/basket.component";
import {LoginComponent} from "./auth/login.component";
import {LogoutComponent} from "./auth/logout.component";
import {ErrorComponent} from "./errors/error.component";

@Component({
    selector: 'b2b-portal',
    template: `
        <b2b-portal-header></b2b-portal-header>
        <div class="row">
            <div class="col-md-12">
                <router-outlet></router-outlet>
            </div>
        </div>
        <b2b-error></b2b-error>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, ErrorComponent]
})
@Routes([
    {path: '/goods', component: GoodsListComponent},
    {path: '/order-list', component: OrderListComponent},
    {path: '/user-info', component: UserInfoComponent},
    {path: '/contacts', component: ContactsComponent},
    {path: '/basket', component: BasketComponent},
    {path: '/login', component: LoginComponent},
    {path: '/logout', component: LogoutComponent}
])
export class B2BPortalComponent {

    constructor(private _router: Router) {
    }

}