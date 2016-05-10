var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("goods/goods-item", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GoodsItem;
    return {
        setters:[],
        execute: function() {
            GoodsItem = (function () {
                function GoodsItem(level, isGroup, name, price, volume, description) {
                    this.level = level;
                    this.isGroup = isGroup;
                    this.name = name;
                    this.price = price;
                    this.volume = volume;
                    this.description = description;
                }
                return GoodsItem;
            }());
            exports_1("GoodsItem", GoodsItem);
        }
    }
});
System.register("goods/goods.service", ["goods/goods-item"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var goods_item_1;
    var GoodsService;
    return {
        setters:[
            function (goods_item_1_1) {
                goods_item_1 = goods_item_1_1;
            }],
        execute: function() {
            GoodsService = (function () {
                function GoodsService() {
                    this.goods = [];
                    this.goods.push(new goods_item_1.GoodsItem(0, true, '01 ЭЛЕКТРОНИКА И ЦИФРОВАЯ ТЕХНИКА'));
                    this.goods.push(new goods_item_1.GoodsItem(1, true, '01 ТЕЛЕВИЗОРЫ'));
                    this.goods.push(new goods_item_1.GoodsItem(2, true, '1 ТЕЛЕВИЗОРЫ'));
                    this.goods.push(new goods_item_1.GoodsItem(3, true, 'ERISSON'));
                    this.goods.push(new goods_item_1.GoodsItem(4, true, 'Телевизор LED ERISSON 32LES70Т2', 12700, 0.0765, 'DVB-T2/C,DVB-S/S2 (спутниковый тюнер) 31,5", LED,slim design, HD,16∶9, ярк. 250 кд/м2, контраст.(стат.) 3000:1, разр. 1366x768, время откл. 8 мс, 100 +DTV 1000 каналов, PAL/SECAM BG/DK/I, телетекст,слот CI+,многофункц.таймер,A2 stereo,Input jack,3*HDMI,2*USB movie+запись, VGA, SCART,S-Video,Headphones,RCA,Virtual Dolby,макс. потр. мощн. 65 Вт, '));
                }
                GoodsService.prototype.getGoods = function () {
                    return this.goods;
                };
                return GoodsService;
            }());
            exports_2("GoodsService", GoodsService);
        }
    }
});
System.register("goods/goods-list.component", ["angular2/core", "goods/goods.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_1, goods_service_1;
    var GoodsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (goods_service_1_1) {
                goods_service_1 = goods_service_1_1;
            }],
        execute: function() {
            GoodsComponent = (function () {
                function GoodsComponent(_goodsServise) {
                    this._goodsServise = _goodsServise;
                }
                GoodsComponent.prototype.ngOnInit = function () {
                    this.goods = this._goodsServise.getGoods();
                };
                GoodsComponent = __decorate([
                    core_1.Component({
                        selector: 'goods-list',
                        template: "\n        <div class=\"panel panel-default\">\n            <table id=\"tree-table-goods\" class=\"table table-bordered table-condensed\">\n                <thead>\n                    <tr>\n                        <th>\u0422\u043E\u0432\u0430\u0440</th>\n                        <th style=\"width: 100px\">\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0442\u043E\u0432\u0430\u0440\u0430</th>\n                        <th style=\"width: 100px\">\u041E\u0431\u044A\u0435\u043C (1 \u0448\u0442)</th>\n                        <th style=\"width: 83px\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</th>\n                        <th>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</th>\n                        <th></th>\n                        <th>\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"#item of goods\">\n                        <td style=\"{{'padding-left:' + (item.level * 15) + 'px'}}\">{{item.name}}</td>\n                        <td>{{item.price}}</td>\n                        <td>{{item.volume}}</td>\n                        <td><abbr title=\"{{item.description}}\">\u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</abbr></td>\n                        <td><input type=\"text\" value=\"1\" size=\"5\"></td>\n                        <td><a class=\"basket-picture\"><span class=\"glyphicon glyphicon-arrow-right\"></span></a></td>\n                        <td>item_count_in_basket</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [goods_service_1.GoodsService])
                ], GoodsComponent);
                return GoodsComponent;
            }());
            exports_3("GoodsComponent", GoodsComponent);
        }
    }
});
System.register("orders/order-item", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var OrderItem;
    return {
        setters:[],
        execute: function() {
            OrderItem = (function () {
                function OrderItem(code, name, count, price, amount, volume, preferred_price) {
                    this.code = code;
                    this.name = name;
                    this.count = count;
                    this.price = price;
                    this.amount = amount;
                    this.volume = volume;
                    this.preferred_price = preferred_price;
                }
                return OrderItem;
            }());
            exports_4("OrderItem", OrderItem);
        }
    }
});
System.register("orders/order", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Order;
    return {
        setters:[],
        execute: function() {
            Order = (function () {
                function Order(number) {
                    this.number = number;
                    this.items = [];
                }
                return Order;
            }());
            exports_5("Order", Order);
        }
    }
});
System.register("orders/order.component", ["angular2/core", "orders/order"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_2, order_1;
    var OrderComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (order_1_1) {
                order_1 = order_1_1;
            }],
        execute: function() {
            OrderComponent = (function () {
                function OrderComponent() {
                    this.editClicked = new core_2.EventEmitter();
                    this.total_count = 0;
                    this.total_amount = 0;
                    this.total_volume = 0;
                }
                OrderComponent.prototype.onEditOrder = function () {
                    this.editClicked.emit('Edit');
                };
                OrderComponent.prototype.onDeleteItem = function () {
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', order_1.Order)
                ], OrderComponent.prototype, "order", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', Object)
                ], OrderComponent.prototype, "editClicked", void 0);
                OrderComponent = __decorate([
                    core_2.Component({
                        selector: 'order',
                        template: "\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">\n                    <a aria-expanded=\"true\" data-toggle=\"collapse\" href=\"#collapse{{order.number}}\">\n                        \u0417\u0430\u043A\u0430\u0437 \u2116{{order.number}} \u043E\u0442 25.03.2016. \u041A\u043E\u0440\u043D\u0438\u0435\u043D\u043A\u043E \u041C.\u0412. \u0418\u041F. \u0411\u0430\u0442\u0430\u0439\u0441\u043A. \u0421\u0443\u043C\u043C\u0430:127&nbsp;450. \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E:21\n                    </a>\n                    <a aria-expanded=\"true\" class=\"pull-right\" data-toggle=\"collapse\" href=\"#\" (click)=\"onEditOrder()\">\n                        <span class=\"glyphicon glyphicon-usd\">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437</span>\n                    </a>\n                </h4>\n            </div>\n            <div aria-expanded=\"true\" style=\"\" id=\"collapse{{order.number}}\" class=\"panel-collapse collapse in\">\n                <div class=\"panel-body\">\n                    <table id=\"tree-table-order\" class=\"table table-bordered table-condensed order-table\">\n                            <thead>\n                            <tr>\n                                <th class=\"row-goods\">\u041F\u043E\u0437\u0438\u0446\u0438\u044F</th>\n                                <th class=\"row-stock\">\u041A\u043E\u043B-\u0432\u043E</th>\n                                <th class=\"row-cost\">\u0426\u0435\u043D\u0430</th>\n                                <th class=\"row-cost\">\u0421\u0443\u043C\u043C\u0430</th>\n                                <th class=\"row-cost\">\u041E\u0431\u044A\u0435\u043C</th>\n                                <th class=\"row-cost\">\u0416\u0435\u043B\u0430\u0435\u043C\u0430\u044F \u0446\u0435\u043D\u0430</th>\n                                <th>\u0423\u0434\u0430\u043B\u0438\u0442\u044C</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"#item of order.items\">\n                                <td>{{item.name}}</td>\n                                <td>{{item.count}}</td>\n                                <td>{{item.price}}</td>\n                                <td>{{item.amount}}</td>\n                                <td>{{(item.volume * item.count).toFixed(4)}}</td>\n                                <td>{{item.preferred_price}}</td>\n                                <td><a (click)=\"onDeleteItem()\"><span class=\"glyphicon glyphicon-remove\"></span></a></td>\n                            </tr>\n                        </tbody>\n                        <tfoot>\n                            <tr>\n                                <td><b>\u0418\u0442\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437</b></td>\n                                <td><b>{{total_count}}</b></td>\n                                <td></td>\n                                <td><b>{{total_amount}}</b></td>\n                                <td><b>{{total_volume.toFixed(4)}}</b></td>\n                                <td></td>\n                                <td></td>\n                            </tr>\n                        </tfoot>\n                    </table>\n                </div>\n            </div>\n        </div>\n        "
                    }), 
                    __metadata('design:paramtypes', [])
                ], OrderComponent);
                return OrderComponent;
            }());
            exports_6("OrderComponent", OrderComponent);
        }
    }
});
System.register("orders/order.service", ["orders/order", "orders/order-item"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var order_2, order_item_1;
    var OrderService;
    return {
        setters:[
            function (order_2_1) {
                order_2 = order_2_1;
            },
            function (order_item_1_1) {
                order_item_1 = order_item_1_1;
            }],
        execute: function() {
            OrderService = (function () {
                function OrderService() {
                    this.orders = [];
                    this.orders.push(new order_2.Order('1'));
                    this.orders[0].items.push(new order_item_1.OrderItem('code 111', 'Item Name 1', 1, 100, 100, 3, 90));
                    this.orders.push(new order_2.Order('2'));
                }
                OrderService.prototype.addOrder = function (order) {
                    this.orders.push(order);
                };
                OrderService.prototype.getOrders = function () {
                    return this.orders;
                };
                // editOrder(order: Order) {
                //     this.orders[this.orders.indexOf(order)] = new Order('!');
                // }
                OrderService.prototype.deleteOrder = function (order) {
                    this.orders.splice(this.orders.indexOf(order), 1);
                };
                OrderService.prototype.addItemToBacket = function (item) {
                    this.basket.items.push(item);
                };
                OrderService.prototype.editItemInBacket = function (item) {
                };
                OrderService.prototype.deleteItemFromBacket = function (item) {
                };
                return OrderService;
            }());
            exports_7("OrderService", OrderService);
        }
    }
});
System.register("orders/order-list.component", ["angular2/core", "orders/order.component", "orders/order.service"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_3, order_component_1, order_service_1;
    var OrderListComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (order_component_1_1) {
                order_component_1 = order_component_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            }],
        execute: function() {
            OrderListComponent = (function () {
                function OrderListComponent(_orderServise) {
                    this._orderServise = _orderServise;
                }
                OrderListComponent.prototype.ngOnInit = function () {
                    this.orders = this._orderServise.getOrders();
                };
                OrderListComponent.prototype.onEditClick = function (order_event) {
                };
                OrderListComponent = __decorate([
                    core_3.Component({
                        selector: 'order-list',
                        template: "\n        <div class=\"panel-group\" id=\"panel-group-orders\">\n            <order *ngFor=\"#order of orders\" [order]=\"order\" (editClicked)=\"onEditClick($event)\"></order>\n        </div>\n    ",
                        directives: [order_component_1.OrderComponent]
                    }), 
                    __metadata('design:paramtypes', [order_service_1.OrderService])
                ], OrderListComponent);
                return OrderListComponent;
            }());
            exports_8("OrderListComponent", OrderListComponent);
        }
    }
});
System.register("users/user-info.component", ["angular2/core"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_4;
    var UserInfoComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            }],
        execute: function() {
            UserInfoComponent = (function () {
                function UserInfoComponent() {
                }
                UserInfoComponent = __decorate([
                    core_4.Component({
                        selector: 'user-info',
                        template: "\n        <h1>User info</h1>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], UserInfoComponent);
                return UserInfoComponent;
            }());
            exports_9("UserInfoComponent", UserInfoComponent);
        }
    }
});
System.register("contacts/contacts.component", ["angular2/core"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_5;
    var ContactsComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            }],
        execute: function() {
            ContactsComponent = (function () {
                function ContactsComponent() {
                }
                ContactsComponent = __decorate([
                    core_5.Component({
                        selector: 'contacts',
                        template: "\n        <h1>Contacts</h1>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ContactsComponent);
                return ContactsComponent;
            }());
            exports_10("ContactsComponent", ContactsComponent);
        }
    }
});
System.register("orders/basket.component", ["angular2/core", "orders/order", "orders/order.service"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_6, order_3, order_service_2;
    var BasketComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (order_3_1) {
                order_3 = order_3_1;
            },
            function (order_service_2_1) {
                order_service_2 = order_service_2_1;
            }],
        execute: function() {
            BasketComponent = (function () {
                function BasketComponent(_orderServise) {
                    this._orderServise = _orderServise;
                }
                BasketComponent.prototype.onClick = function () {
                    console.log('Make order');
                    this._orderServise.addOrder(this.order);
                };
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', order_3.Order)
                ], BasketComponent.prototype, "order", void 0);
                BasketComponent = __decorate([
                    core_6.Component({
                        selector: 'order',
                        template: "\n        <div class=\"panel panel-default\">\n\t\t    <div class=\"panel-heading\">\u041A\u043B\u0438\u0435\u043D\u0442</div>\n\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"legal-entity\">\n\t\t\t\t\t\t\t\u042E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043B\u0438\u0446\u043E:\n\t\t\t\t\t\t\t<select class=\"selectpicker\" data-width=\"auto\" id=\"select-legal-entity\">\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"outlet\">\n\t\t\t\t\t\t\t\u0414\u043B\u044F \u0442\u043E\u0440\u0433\u043E\u0432\u043E\u0439 \u0442\u043E\u0447\u043A\u0438:\n\t\t\t\t\t\t\t<select class=\"selectpicker\" data-width=\"auto\" id=\"select-outlet\">\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t<!--\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0437\u0430\u043A\u0430\u0437-->\n\t\t\t\t\t<button id=\"make-order-button\" type=\"button\" class=\"btn btn-large btn-warning\" (click)=\"onClick()\">\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437 <span class=\"glyphicon glyphicon-usd\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t<div class=\"table-responsive\" id=\"tree-order\">\n\t\t\t\t\t\t<table id=\"tree-table-order\" class=\"table table-bordered table-condensed\">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th class=\"row-goods\">\u041F\u043E\u0437\u0438\u0446\u0438\u044F</th>\n\t\t\t\t\t\t\t\t<th class=\"row-stock\">\u041A\u043E\u043B-\u0432\u043E</th>\n\t\t\t\t\t\t\t\t<th class=\"row-cost\">\u0426\u0435\u043D\u0430</th>\n\t\t\t\t\t\t\t\t<th class=\"row-cost\">\u0421\u0443\u043C\u043C\u0430</th>\n\t\t\t\t\t\t\t\t<th class=\"row-cost\">\u041E\u0431\u044A\u0435\u043C</th>\n\t\t\t\t\t\t\t\t<th class=\"row-cost\">\u0416\u0435\u043B\u0430\u0435\u043C\u0430\u044F \u0446\u0435\u043D\u0430</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t\t<td><a href=\"#\" data-pk=\"1\"></a></td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t<!--\n\t\t\t\t\t\t\t\t\t\t\t\t<table id=\"tree-table-order-footer\" class=\"table table-bordered table-condensed\">\n\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t-->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n    "
                    }), 
                    __metadata('design:paramtypes', [order_service_2.OrderService])
                ], BasketComponent);
                return BasketComponent;
            }());
            exports_11("BasketComponent", BasketComponent);
        }
    }
});
System.register("b2b-portal.component", ['angular2/core', "angular2/router", "goods/goods-list.component", "orders/order-list.component", "users/user-info.component", "contacts/contacts.component", "orders/basket.component"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_7, router_1, goods_list_component_1, order_list_component_1, user_info_component_1, contacts_component_1, basket_component_1;
    var B2BPortalComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (goods_list_component_1_1) {
                goods_list_component_1 = goods_list_component_1_1;
            },
            function (order_list_component_1_1) {
                order_list_component_1 = order_list_component_1_1;
            },
            function (user_info_component_1_1) {
                user_info_component_1 = user_info_component_1_1;
            },
            function (contacts_component_1_1) {
                contacts_component_1 = contacts_component_1_1;
            },
            function (basket_component_1_1) {
                basket_component_1 = basket_component_1_1;
            }],
        execute: function() {
            B2BPortalComponent = (function () {
                function B2BPortalComponent(_router) {
                    this._router = _router;
                }
                B2BPortalComponent = __decorate([
                    core_7.Component({
                        selector: 'b2b-portal',
                        template: "\n        <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n            <div class=\"container-fluid\">\n                <div class=\"navbar-header\">\n                    <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\"\n                            data-target=\"#bs-example-navbar-collapse-1\">\n                        <span class=\"sr-only\">Toggle navigation</span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                    </button>\n                    <a class=\"navbar-brand\" href=\"#\">\u041B\u043E\u0433\u043E\u0442\u0438\u043F</a>\n                </div>\n                <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                    <ul class=\"nav navbar-nav\">\n                        <li>\n                            <a [routerLink]=\"['Goods']\">\u0422\u043E\u0432\u0430\u0440\u044B</a>\n                        </li>\n                        <!--\n                                    </ul>\n                                    <form class=\"navbar-form navbar-left\" role=\"search\">\n                                        <div class=\"form-group\">\n                                            <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\n                                        </div>\n                                        <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n                                    </form>\n                                    <ul class=\"nav navbar-nav\">\n                        -->\n                        <li>\n                            <a [routerLink]=\"['OrderList']\">\u0417\u0430\u043A\u0430\u0437\u044B</a>\n                        </li>\n                        <li>\n                            <a [routerLink]=\"['UserInfo']\">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435</a>\n                        </li>\n                        <li>\n                            <a [routerLink]=\"['Contacts']\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</a>\n                        </li>\n                    </ul>\n                    <button id=\"enter\" type=\"button\" class=\"navbar-right btn btn-default b2b_btn_enter\" data-toggle=\"modal\"\n                            data-target=\"#sign-in-modal\">\u0412\u043E\u0439\u0442\u0438\n                    </button>\n                    <button id=\"exit\" type=\"button\" class=\"navbar-right btn btn-default b2b_btn_exit\" style=\"display:none\">\n                        \u0412\u044B\u0439\u0442\u0438\n                    </button>\n                    <ul class=\"nav navbar-nav navbar-right\">\n                        <li>\n                            <a [routerLink]=\"['Basket']\"><span class=\"glyphicon glyphicon-shopping-cart\"></span></a>\n                        </li>\n                        <li>\n                            <a id=\"login-text\"></a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </nav>\n        \n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <router-outlet></router-outlet>\n            </div>\n        </div>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/goods', name: 'Goods', component: goods_list_component_1.GoodsComponent, useAsDefault: true },
                        { path: '/order-list', name: 'OrderList', component: order_list_component_1.OrderListComponent },
                        { path: '/user-info', name: 'UserInfo', component: user_info_component_1.UserInfoComponent },
                        { path: '/contacts', name: 'Contacts', component: contacts_component_1.ContactsComponent },
                        { path: '/basket', name: 'Basket', component: basket_component_1.BasketComponent },
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], B2BPortalComponent);
                return B2BPortalComponent;
            }());
            exports_12("B2BPortalComponent", B2BPortalComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "angular2/router", "b2b-portal.component", "orders/order.service", "goods/goods.service"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var browser_1, router_2, b2b_portal_component_1, order_service_3, goods_service_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (b2b_portal_component_1_1) {
                b2b_portal_component_1 = b2b_portal_component_1_1;
            },
            function (order_service_3_1) {
                order_service_3 = order_service_3_1;
            },
            function (goods_service_2_1) {
                goods_service_2 = goods_service_2_1;
            }],
        execute: function() {
            browser_1.bootstrap(b2b_portal_component_1.B2BPortalComponent, [router_2.ROUTER_PROVIDERS, goods_service_2.GoodsService, order_service_3.OrderService]);
        }
    }
});
System.register("auth/user", [], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(login, password) {
                    this.login = login;
                    this.password = password;
                }
                return User;
            }());
            exports_14("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdvb2RzL2dvb2RzLWl0ZW0udHMiLCJnb29kcy9nb29kcy5zZXJ2aWNlLnRzIiwiZ29vZHMvZ29vZHMtbGlzdC5jb21wb25lbnQudHMiLCJvcmRlcnMvb3JkZXItaXRlbS50cyIsIm9yZGVycy9vcmRlci50cyIsIm9yZGVycy9vcmRlci5jb21wb25lbnQudHMiLCJvcmRlcnMvb3JkZXIuc2VydmljZS50cyIsIm9yZGVycy9vcmRlci1saXN0LmNvbXBvbmVudC50cyIsInVzZXJzL3VzZXItaW5mby5jb21wb25lbnQudHMiLCJjb250YWN0cy9jb250YWN0cy5jb21wb25lbnQudHMiLCJvcmRlcnMvYmFza2V0LmNvbXBvbmVudC50cyIsImIyYi1wb3J0YWwuY29tcG9uZW50LnRzIiwiYm9vdC50cyIsImF1dGgvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBQUE7Z0JBQ0ksbUJBQ1csS0FBYSxFQUNiLE9BQWdCLEVBQ2hCLElBQVksRUFDWixLQUFjLEVBQ2QsTUFBZSxFQUNmLFdBQW9CO29CQUxwQixVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUNiLFlBQU8sR0FBUCxPQUFPLENBQVM7b0JBQ2hCLFNBQUksR0FBSixJQUFJLENBQVE7b0JBQ1osVUFBSyxHQUFMLEtBQUssQ0FBUztvQkFDZCxXQUFNLEdBQU4sTUFBTSxDQUFTO29CQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFTO2dCQUM1QixDQUFDO2dCQUNSLGdCQUFDO1lBQUQsQ0FUQSxBQVNDLElBQUE7WUFURCxpQ0FTQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7WUNQRDtnQkFHSTtvQkFGQSxVQUFLLEdBQWdCLEVBQUUsQ0FBQztvQkFHcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxzQkFBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsbUNBQW1DLENBQUMsQ0FBQyxDQUFDO29CQUM3RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLHNC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RCxtQkFBUyxDQUFDLHlDQUFrQixFQUFFLENBQUMseUJBQWdCLEVBQUUsNEJBQVksRUFBRSw0QkFBWSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7WUNQOUU7Z0JBQ0ksY0FBbUIsS0FBYSxFQUFTLFFBQWdCO29CQUF0QyxVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7Z0JBRXpELENBQUM7Z0JBQ0wsV0FBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBSkQsd0JBSUMsQ0FBQSIsImZpbGUiOiIuLi8uLi8uLi9CMkJfUG9ydGFsL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHb29kc0l0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGxldmVsOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGlzR3JvdXA6IGJvb2xlYW4sXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgcHJpY2U/OiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHZvbHVtZT86IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgZGVzY3JpcHRpb24/OiBzdHJpbmdcclxuICAgICkge31cclxufSIsImltcG9ydCB7R29vZHNJdGVtfSBmcm9tIFwiLi9nb29kcy1pdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR29vZHNTZXJ2aWNlIHtcclxuICAgIGdvb2RzOiBHb29kc0l0ZW1bXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZ29vZHMucHVzaChuZXcgR29vZHNJdGVtKDAsIHRydWUsICcwMSDQrdCb0JXQmtCi0KDQntCd0JjQmtCQINCYINCm0JjQpNCg0J7QktCQ0K8g0KLQldCl0J3QmNCa0JAnKSk7XHJcbiAgICAgICAgdGhpcy5nb29kcy5wdXNoKG5ldyBHb29kc0l0ZW0oMSwgdHJ1ZSwgJzAxINCi0JXQm9CV0JLQmNCX0J7QoNCrJykpO1xyXG4gICAgICAgIHRoaXMuZ29vZHMucHVzaChuZXcgR29vZHNJdGVtKDIsIHRydWUsICcxINCi0JXQm9CV0JLQmNCX0J7QoNCrJykpO1xyXG4gICAgICAgIHRoaXMuZ29vZHMucHVzaChuZXcgR29vZHNJdGVtKDMsIHRydWUsICdFUklTU09OJykpO1xyXG4gICAgICAgIHRoaXMuZ29vZHMucHVzaChuZXcgR29vZHNJdGVtKDQsIHRydWUsICfQotC10LvQtdCy0LjQt9C+0YAgTEVEIEVSSVNTT04gMzJMRVM3MNCiMicsIDEyNzAwLCAwLjA3NjUsICdEVkItVDIvQyxEVkItUy9TMiAo0YHQv9GD0YLQvdC40LrQvtCy0YvQuSDRgtGO0L3QtdGAKSAzMSw1XCIsIExFRCxzbGltIGRlc2lnbiwgSEQsMTbiiLY5LCDRj9GA0LouIDI1MCDQutC0L9C8Miwg0LrQvtC90YLRgNCw0YHRgi4o0YHRgtCw0YIuKSAzMDAwOjEsINGA0LDQt9GALiAxMzY2eDc2OCwg0LLRgNC10LzRjyDQvtGC0LrQuy4gOCDQvNGBLCAxMDAgK0RUViAxMDAwINC60LDQvdCw0LvQvtCyLCBQQUwvU0VDQU0gQkcvREsvSSwg0YLQtdC70LXRgtC10LrRgdGCLNGB0LvQvtGCIENJKyzQvNC90L7Qs9C+0YTRg9C90LrRhi7RgtCw0LnQvNC10YAsQTIgc3RlcmVvLElucHV0IGphY2ssMypIRE1JLDIqVVNCIG1vdmllK9C30LDQv9C40YHRjCwgVkdBLCBTQ0FSVCxTLVZpZGVvLEhlYWRwaG9uZXMsUkNBLFZpcnR1YWwgRG9sYnks0LzQsNC60YEuINC/0L7RgtGALiDQvNC+0YnQvS4gNjUg0JLRgiwgJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdvb2RzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdvb2RzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL2NvcmVcIjtcclxuaW1wb3J0IHtHb29kc0l0ZW19IGZyb20gXCIuL2dvb2RzLWl0ZW1cIjtcclxuaW1wb3J0IHtHb29kc1NlcnZpY2V9IGZyb20gXCIuL2dvb2RzLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdnb29kcy1saXN0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgPHRhYmxlIGlkPVwidHJlZS10YWJsZS1nb29kc1wiIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtY29uZGVuc2VkXCI+XHJcbiAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+0KLQvtCy0LDRgDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT1cIndpZHRoOiAxMDBweFwiPtCh0YLQvtC40LzQvtGB0YLRjCDRgtC+0LLQsNGA0LA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9XCJ3aWR0aDogMTAwcHhcIj7QntCx0YrQtdC8ICgxINGI0YIpPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPVwid2lkdGg6IDgzcHhcIj7QntC/0LjRgdCw0L3QuNC1PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCU0L7QsdCw0LLQuNGC0Ywg0LIg0LrQvtGA0LfQuNC90YM8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCSINC60L7RgNC30LjQvdC1PC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwiI2l0ZW0gb2YgZ29vZHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwie3sncGFkZGluZy1sZWZ0OicgKyAoaXRlbS5sZXZlbCAqIDE1KSArICdweCd9fVwiPnt7aXRlbS5uYW1lfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3tpdGVtLnByaWNlfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3tpdGVtLnZvbHVtZX19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxhYmJyIHRpdGxlPVwie3tpdGVtLmRlc2NyaXB0aW9ufX1cIj7QvtC/0LjRgdCw0L3QuNC1PC9hYmJyPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIjFcIiBzaXplPVwiNVwiPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YSBjbGFzcz1cImJhc2tldC1waWN0dXJlXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWFycm93LXJpZ2h0XCI+PC9zcGFuPjwvYT48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+aXRlbV9jb3VudF9pbl9iYXNrZXQ8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR29vZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgZ29vZHM6IEdvb2RzSXRlbVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2dvb2RzU2VydmlzZSA6IEdvb2RzU2VydmljZSl7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nb29kcyA9IHRoaXMuX2dvb2RzU2VydmlzZS5nZXRHb29kcygpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBPcmRlckl0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGNvZGU6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBjb3VudDogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyBwcmljZTogbnVtYmVyLFxyXG4gICAgICAgIHB1YmxpYyBhbW91bnQ6IG51bWJlcixcclxuICAgICAgICBwdWJsaWMgdm9sdW1lOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIHByZWZlcnJlZF9wcmljZTogbnVtYmVyXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge09yZGVySXRlbX0gZnJvbSBcIi4vb3JkZXItaXRlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9yZGVyIHtcclxuICAgIGl0ZW1zOiBPcmRlckl0ZW1bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbnVtYmVyOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi9vcmRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ29yZGVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cInBhbmVsLXRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgYXJpYS1leHBhbmRlZD1cInRydWVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgaHJlZj1cIiNjb2xsYXBzZXt7b3JkZXIubnVtYmVyfX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAg0JfQsNC60LDQtyDihJZ7e29yZGVyLm51bWJlcn19INC+0YIgMjUuMDMuMjAxNi4g0JrQvtGA0L3QuNC10L3QutC+INCcLtCSLiDQmNCfLiDQkdCw0YLQsNC50YHQui4g0KHRg9C80LzQsDoxMjcmbmJzcDs0NTAuINCa0L7Qu9C40YfQtdGB0YLQstC+OjIxXHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGFyaWEtZXhwYW5kZWQ9XCJ0cnVlXCIgY2xhc3M9XCJwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGhyZWY9XCIjXCIgKGNsaWNrKT1cIm9uRWRpdE9yZGVyKClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZFwiPtCY0LfQvNC10L3QuNGC0Ywg0LfQsNC60LDQtzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiIHN0eWxlPVwiXCIgaWQ9XCJjb2xsYXBzZXt7b3JkZXIubnVtYmVyfX1cIiBjbGFzcz1cInBhbmVsLWNvbGxhcHNlIGNvbGxhcHNlIGluXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBpZD1cInRyZWUtdGFibGUtb3JkZXJcIiBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZCBvcmRlci10YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1nb29kc1wiPtCf0L7Qt9C40YbQuNGPPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJyb3ctc3RvY2tcIj7QmtC+0Lst0LLQvjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwicm93LWNvc3RcIj7QptC10L3QsDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwicm93LWNvc3RcIj7QodGD0LzQvNCwPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJyb3ctY29zdFwiPtCe0LHRitC10Lw8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJvdy1jb3N0XCI+0JbQtdC70LDQtdC80LDRjyDRhtC10L3QsDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPtCj0LTQsNC70LjRgtGMPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCIjaXRlbSBvZiBvcmRlci5pdGVtc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57e2l0ZW0ubmFtZX19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3tpdGVtLmNvdW50fX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57e2l0ZW0ucHJpY2V9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7aXRlbS5hbW91bnR9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnt7KGl0ZW0udm9sdW1lICogaXRlbS5jb3VudCkudG9GaXhlZCg0KX19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3tpdGVtLnByZWZlcnJlZF9wcmljZX19PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGEgKGNsaWNrKT1cIm9uRGVsZXRlSXRlbSgpXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVwiPjwvc3Bhbj48L2E+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Zm9vdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGI+0JjRgtC+0LPQviDQt9Cw0LrQsNC3PC9iPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxiPnt7dG90YWxfY291bnR9fTwvYj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48Yj57e3RvdGFsX2Ftb3VudH19PC9iPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxiPnt7dG90YWxfdm9sdW1lLnRvRml4ZWQoNCl9fTwvYj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Zm9vdD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE9yZGVyQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIG9yZGVyOiBPcmRlcjtcclxuICAgIEBPdXRwdXQoKSBlZGl0Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gICAgdG90YWxfY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICB0b3RhbF9hbW91bnQ6IG51bWJlciA9IDA7XHJcbiAgICB0b3RhbF92b2x1bWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgb25FZGl0T3JkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5lZGl0Q2xpY2tlZC5lbWl0KCdFZGl0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZWxldGVJdGVtKCkge1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge09yZGVyfSBmcm9tIFwiLi9vcmRlclwiO1xyXG5pbXBvcnQge09yZGVySXRlbX0gZnJvbSBcIi4vb3JkZXItaXRlbVwiO1xyXG5leHBvcnQgY2xhc3MgT3JkZXJTZXJ2aWNlIHtcclxuICAgIG9yZGVyczogT3JkZXJbXSA9IFtdO1xyXG4gICAgYmFza2V0OiBPcmRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm9yZGVycy5wdXNoKG5ldyBPcmRlcignMScpKTtcclxuICAgICAgICB0aGlzLm9yZGVyc1swXS5pdGVtcy5wdXNoKG5ldyBPcmRlckl0ZW0oJ2NvZGUgMTExJywgJ0l0ZW0gTmFtZSAxJywgMSwgMTAwLCAxMDAsIDMsIDkwKSk7XHJcbiAgICAgICAgdGhpcy5vcmRlcnMucHVzaChuZXcgT3JkZXIoJzInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkT3JkZXIob3JkZXI6IE9yZGVyKSB7XHJcbiAgICAgICAgdGhpcy5vcmRlcnMucHVzaChvcmRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T3JkZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9yZGVycztcclxuICAgIH1cclxuXHJcbiAgICAvLyBlZGl0T3JkZXIob3JkZXI6IE9yZGVyKSB7XHJcbiAgICAvLyAgICAgdGhpcy5vcmRlcnNbdGhpcy5vcmRlcnMuaW5kZXhPZihvcmRlcildID0gbmV3IE9yZGVyKCchJyk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgZGVsZXRlT3JkZXIob3JkZXI6IE9yZGVyKSB7XHJcbiAgICAgICAgdGhpcy5vcmRlcnMuc3BsaWNlKHRoaXMub3JkZXJzLmluZGV4T2Yob3JkZXIpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJdGVtVG9CYWNrZXQoaXRlbTogT3JkZXJJdGVtKSB7XHJcbiAgICAgICAgdGhpcy5iYXNrZXQuaXRlbXMucHVzaChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0SXRlbUluQmFja2V0KGl0ZW06IE9yZGVySXRlbSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVJdGVtRnJvbUJhY2tldChpdGVtOiBPcmRlckl0ZW0pIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvY29yZVwiO1xyXG5pbXBvcnQge09yZGVyQ29tcG9uZW50fSBmcm9tIFwiLi9vcmRlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4vb3JkZXJcIjtcclxuaW1wb3J0IHtPcmRlclNlcnZpY2V9IGZyb20gXCIuL29yZGVyLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdvcmRlci1saXN0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWdyb3VwXCIgaWQ9XCJwYW5lbC1ncm91cC1vcmRlcnNcIj5cclxuICAgICAgICAgICAgPG9yZGVyICpuZ0Zvcj1cIiNvcmRlciBvZiBvcmRlcnNcIiBbb3JkZXJdPVwib3JkZXJcIiAoZWRpdENsaWNrZWQpPVwib25FZGl0Q2xpY2soJGV2ZW50KVwiPjwvb3JkZXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgZGlyZWN0aXZlczogW09yZGVyQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3JkZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIG9yZGVyczogT3JkZXJbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vcmRlclNlcnZpc2UgOiBPcmRlclNlcnZpY2Upe1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMub3JkZXJzID0gdGhpcy5fb3JkZXJTZXJ2aXNlLmdldE9yZGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRWRpdENsaWNrKG9yZGVyX2V2ZW50KSB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXNlci1pbmZvJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGgxPlVzZXIgaW5mbzwvaDE+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VySW5mb0NvbXBvbmVudCB7XHJcblxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnY29udGFjdHMnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8aDE+Q29udGFjdHM8L2gxPlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29udGFjdHNDb21wb25lbnQge1xyXG5cclxufSIsImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XHJcbmltcG9ydCB7T3JkZXJ9IGZyb20gXCIuL29yZGVyXCI7XHJcbmltcG9ydCB7T3JkZXJTZXJ2aWNlfSBmcm9tIFwiLi9vcmRlci5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnb3JkZXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxyXG5cdFx0ICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+0JrQu9C40LXQvdGCPC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtbWQtNlwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibGVnYWwtZW50aXR5XCI+XHJcblx0XHRcdFx0XHRcdFx00K7RgNC40LTQuNGH0LXRgdC60L7QtSDQu9C40YbQvjpcclxuXHRcdFx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzPVwic2VsZWN0cGlja2VyXCIgZGF0YS13aWR0aD1cImF1dG9cIiBpZD1cInNlbGVjdC1sZWdhbC1lbnRpdHlcIj5cclxuXHRcdFx0XHRcdFx0XHQ8L3NlbGVjdD5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtbWQtNlwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwib3V0bGV0XCI+XHJcblx0XHRcdFx0XHRcdFx00JTQu9GPINGC0L7RgNCz0L7QstC+0Lkg0YLQvtGH0LrQuDpcclxuXHRcdFx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzPVwic2VsZWN0cGlja2VyXCIgZGF0YS13aWR0aD1cImF1dG9cIiBpZD1cInNlbGVjdC1vdXRsZXRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8L3NlbGVjdD5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cclxuXHRcdFx0XHRcdDwhLS3QotC10LrRg9GJ0LjQuSDQt9Cw0LrQsNC3LS0+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGlkPVwibWFrZS1vcmRlci1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxhcmdlIGJ0bi13YXJuaW5nXCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPtCe0YTQvtGA0LzQuNGC0Ywg0LfQsNC60LDQtyA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tdXNkXCI+PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJ0YWJsZS1yZXNwb25zaXZlXCIgaWQ9XCJ0cmVlLW9yZGVyXCI+XHJcblx0XHRcdFx0XHRcdDx0YWJsZSBpZD1cInRyZWUtdGFibGUtb3JkZXJcIiBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG5cdFx0XHRcdFx0XHRcdDx0aGVhZD5cclxuXHRcdFx0XHRcdFx0XHQ8dHI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJyb3ctZ29vZHNcIj7Qn9C+0LfQuNGG0LjRjzwvdGg+XHJcblx0XHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJyb3ctc3RvY2tcIj7QmtC+0Lst0LLQvjwvdGg+XHJcblx0XHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJyb3ctY29zdFwiPtCm0LXQvdCwPC90aD5cclxuXHRcdFx0XHRcdFx0XHRcdDx0aCBjbGFzcz1cInJvdy1jb3N0XCI+0KHRg9C80LzQsDwvdGg+XHJcblx0XHRcdFx0XHRcdFx0XHQ8dGggY2xhc3M9XCJyb3ctY29zdFwiPtCe0LHRitC10Lw8L3RoPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwicm93LWNvc3RcIj7QltC10LvQsNC10LzQsNGPINGG0LXQvdCwPC90aD5cclxuXHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHRcdDwvdGhlYWQ+XHJcblx0XHRcdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdFx0XHRcdDx0ZD48L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHRkPjwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHQ8dGQ+PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdDx0ZD48L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHRkPjwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHQ8dGQ+PGEgaHJlZj1cIiNcIiBkYXRhLXBrPVwiMVwiPjwvYT48L3RkPlxyXG5cdFx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHRcdFx0PC90YWJsZT5cclxuXHRcdFx0XHRcdFx0PCEtLVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGFibGUgaWQ9XCJ0cmVlLXRhYmxlLW9yZGVyLWZvb3RlclwiIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtY29uZGVuc2VkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvdGFibGU+XHJcblx0XHRcdFx0XHRcdC0tPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFza2V0Q29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIG9yZGVyOiBPcmRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vcmRlclNlcnZpc2UgOiBPcmRlclNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljaygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnTWFrZSBvcmRlcicpO1xyXG4gICAgICAgIHRoaXMuX29yZGVyU2VydmlzZS5hZGRPcmRlcih0aGlzLm9yZGVyKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZUNvbmZpZywgUm91dGVyfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5pbXBvcnQge0dvb2RzQ29tcG9uZW50fSBmcm9tIFwiLi9nb29kcy9nb29kcy1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPcmRlckxpc3RDb21wb25lbnR9IGZyb20gXCIuL29yZGVycy9vcmRlci1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtVc2VySW5mb0NvbXBvbmVudH0gZnJvbSBcIi4vdXNlcnMvdXNlci1pbmZvLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDb250YWN0c0NvbXBvbmVudH0gZnJvbSBcIi4vY29udGFjdHMvY29udGFjdHMuY29tcG9uZW50XCI7XG5pbXBvcnQge0Jhc2tldENvbXBvbmVudH0gZnJvbSBcIi4vb3JkZXJzL2Jhc2tldC5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdiMmItcG9ydGFsJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmF2IGNsYXNzPVwibmF2YmFyIG5hdmJhci1kZWZhdWx0IG5hdmJhci1maXhlZC10b3BcIiByb2xlPVwibmF2aWdhdGlvblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZiYXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2YmFyLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtdGFyZ2V0PVwiI2JzLWV4YW1wbGUtbmF2YmFyLWNvbGxhcHNlLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPlRvZ2dsZSBuYXZpZ2F0aW9uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJhclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1iYXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYmFyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPtCb0L7Qs9C+0YLQuNC/PC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cImJzLWV4YW1wbGUtbmF2YmFyLWNvbGxhcHNlLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJ0dvb2RzJ11cIj7QotC+0LLQsNGA0Ys8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwibmF2YmFyLWZvcm0gbmF2YmFyLWxlZnRcIiByb2xlPVwic2VhcmNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+U3VibWl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2YmFyLW5hdlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWydPcmRlckxpc3QnXVwiPtCX0LDQutCw0LfRizwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWydVc2VySW5mbyddXCI+0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9C1PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJ0NvbnRhY3RzJ11cIj7QmtC+0L3RgtCw0LrRgtGLPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImVudGVyXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2YmFyLXJpZ2h0IGJ0biBidG4tZGVmYXVsdCBiMmJfYnRuX2VudGVyXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS10YXJnZXQ9XCIjc2lnbi1pbi1tb2RhbFwiPtCS0L7QudGC0LhcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJleGl0XCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2YmFyLXJpZ2h0IGJ0biBidG4tZGVmYXVsdCBiMmJfYnRuX2V4aXRcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAg0JLRi9C50YLQuFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgbmF2YmFyLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiWydCYXNrZXQnXVwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1zaG9wcGluZy1jYXJ0XCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaWQ9XCJsb2dpbi10ZXh0XCI+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25hdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAgICB7cGF0aDogJy9nb29kcycsIG5hbWU6ICdHb29kcycsIGNvbXBvbmVudDogR29vZHNDb21wb25lbnQsIHVzZUFzRGVmYXVsdDogdHJ1ZX0sXG4gICAge3BhdGg6ICcvb3JkZXItbGlzdCcsIG5hbWU6ICdPcmRlckxpc3QnLCBjb21wb25lbnQ6IE9yZGVyTGlzdENvbXBvbmVudH0sXG4gICAge3BhdGg6ICcvdXNlci1pbmZvJywgbmFtZTogJ1VzZXJJbmZvJywgY29tcG9uZW50OiBVc2VySW5mb0NvbXBvbmVudH0sXG4gICAge3BhdGg6ICcvY29udGFjdHMnLCBuYW1lOiAnQ29udGFjdHMnLCBjb21wb25lbnQ6IENvbnRhY3RzQ29tcG9uZW50fSxcbiAgICB7cGF0aDogJy9iYXNrZXQnLCBuYW1lOiAnQmFza2V0JywgY29tcG9uZW50OiBCYXNrZXRDb21wb25lbnR9LFxuXSlcbmV4cG9ydCBjbGFzcyBCMkJQb3J0YWxDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB9XG5cbn0iLCIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHlwaW5ncy9icm93c2VyLmQudHNcIi8+XG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge1JPVVRFUl9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbmltcG9ydCB7QjJCUG9ydGFsQ29tcG9uZW50fSBmcm9tIFwiLi9iMmItcG9ydGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPcmRlclNlcnZpY2V9IGZyb20gXCIuL29yZGVycy9vcmRlci5zZXJ2aWNlXCI7XG5pbXBvcnQge0dvb2RzU2VydmljZX0gZnJvbSBcIi4vZ29vZHMvZ29vZHMuc2VydmljZVwiO1xuXG5ib290c3RyYXAoQjJCUG9ydGFsQ29tcG9uZW50LCBbUk9VVEVSX1BST1ZJREVSUywgR29vZHNTZXJ2aWNlLCBPcmRlclNlcnZpY2VdKTsiLCJleHBvcnQgY2xhc3MgVXNlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9naW46IHN0cmluZywgcHVibGljIHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuXHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
