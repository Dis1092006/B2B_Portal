///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {B2BPortalComponent} from "./b2b-portal.component";
import {ROUTER_PROVIDERS} from "angular2/router";

bootstrap(B2BPortalComponent, [ROUTER_PROVIDERS]);