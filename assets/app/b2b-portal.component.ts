import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {GoodsComponent} from "./goods/goods-list.component";
import {OrderListComponent} from "./orders/order-list.component";
import {UserInfoComponent} from "./users/user-info.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {BasketComponent} from "./orders/basket.component";

@Component({
    selector: 'b2b-portal',
    template: `
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Логотип</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li>
                            <a [routerLink]="['Goods']">Товары</a>
                        </li>
                        <!--
                                    </ul>
                                    <form class="navbar-form navbar-left" role="search">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Search">
                                        </div>
                                        <button type="submit" class="btn btn-default">Submit</button>
                                    </form>
                                    <ul class="nav navbar-nav">
                        -->
                        <li>
                            <a [routerLink]="['OrderList']">Заказы</a>
                        </li>
                        <li>
                            <a [routerLink]="['UserInfo']">Информация о пользователе</a>
                        </li>
                        <li>
                            <a [routerLink]="['Contacts']">Контакты</a>
                        </li>
                    </ul>
                    <button id="enter" type="button" class="navbar-right btn btn-default b2b_btn_enter" data-toggle="modal"
                            data-target="#sign-in-modal">Войти
                    </button>
                    <button id="exit" type="button" class="navbar-right btn btn-default b2b_btn_exit" style="display:none">
                        Выйти
                    </button>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a [routerLink]="['Basket']"><span class="glyphicon glyphicon-shopping-cart"></span></a>
                        </li>
                        <li>
                            <a id="login-text"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <div class="row">
            <div class="col-md-12">
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/goods', name: 'Goods', component: GoodsComponent, useAsDefault: true},
    {path: '/order-list', name: 'OrderList', component: OrderListComponent},
    {path: '/user-info', name: 'UserInfo', component: UserInfoComponent},
    {path: '/contacts', name: 'Contacts', component: ContactsComponent},
    {path: '/basket', name: 'Basket', component: BasketComponent},
])
export class B2BPortalComponent {

    constructor(private _router: Router) {
    }

}