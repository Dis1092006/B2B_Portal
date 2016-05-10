///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from "angular2/router";
import {B2BPortalComponent} from "./b2b-portal.component";
import {OrderService} from "./orders/order.service";
import {GoodsService} from "./goods/goods.service";

bootstrap(B2BPortalComponent, [ROUTER_PROVIDERS, GoodsService, OrderService]);