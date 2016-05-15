import {ROUTER_DIRECTIVES} from "@angular/router";
import {Component} from "@angular/core";

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
                    <button id="enter" type="button" class="navbar-right btn btn-default b2b_btn_enter" data-toggle="modal"
                            data-target="#sign-in-modal">Войти!!!
                    </button>
                    <button id="exit" type="button" class="navbar-right btn btn-default b2b_btn_exit">
                        Выйти!!!
                    </button>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a [routerLink]="['basket']"><span class="glyphicon glyphicon-shopping-cart"></span></a>
                        </li>
                        <li>
                            <a [routerLink]="['auth']" id="login-text">Auth</a>
                        </li>
                        <li>
		                    <a [routerLink]="['login']" class="btn btn-small btn-default">Войти</a>
                        </li>
                        <li>
		                    <a [routerLink]="['logout']" class="btn btn-small btn-default">Выйти</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `,
	directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent {

}