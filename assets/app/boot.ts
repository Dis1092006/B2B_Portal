///<reference path="../../typings.d.ts"/>
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {ROUTER_PROVIDERS} from "@angular/router";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {B2BPortalComponent} from "./b2b-portal.component";
import {OrderService} from "./orders/order.service";
import {GoodsService} from "./goods/goods.service";
import {BasketService} from "./orders/basket.service";

bootstrap(B2BPortalComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy}), GoodsService, OrderService, BasketService]);