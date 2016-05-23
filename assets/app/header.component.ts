import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from "./auth/auth.service";
import {BasketService} from "./orders/basket.service";

@Component({
	selector: 'b2b-portal-header',
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
                            <a [routerLink]="['goods']">Товары</a>
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
                            <a [routerLink]="['order-list']">Заказы</a>
                        </li>
                        <li>
                            <a [routerLink]="['user-info']">Информация о пользователе</a>
                        </li>
                        <li>
                            <a [routerLink]="['contacts']">Контакты</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a [routerLink]="['basket']"><span class="glyphicon glyphicon-shopping-cart"></span>{{basketInfo}}</a>
                        </li>
                        <li>
		                    <a [routerLink]="['login']" *ngIf="!isLoggedIn()" class="btn btn-default">Войти</a>
                        </li>
                        <li>
		                    <a [routerLink]="['logout']" *ngIf="isLoggedIn()" class="btn btn-default">Выйти</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `,
	directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent implements OnInit {
	basketInfo: string;

	constructor(private _authService: AuthService, private _basketService: BasketService) { }

	ngOnInit() {
		this.basketInfo = this._basketService.getBasketInfo();
		this._basketService.basketInfoChanged.subscribe(
			basketInfo => {
				this.basketInfo = basketInfo;
			}
		);
	}

	isLoggedIn() {
		return this._authService.isLoggedIn();
	}
}