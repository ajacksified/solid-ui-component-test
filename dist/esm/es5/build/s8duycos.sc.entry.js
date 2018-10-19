import * as tslib_1 from '../polyfills/tslib.js';
/*! Built with http://stenciljs.com */
import { h } from '../postcomponent.core.js';
var LoginComponent = /** @class */ (function () {
    function LoginComponent() {
    }
    LoginComponent.prototype.providerChangedHandler = function (event) {
        console.log(event.detail);
        this.loginProvider = event.detail;
    };
    LoginComponent.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.loginProvider) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        config = {
                            storage: localStorage
                        };
                        if (this.callback) {
                            config.callbackUri = this.callback;
                        }
                        return [4 /*yield*/, solid.auth.login(this.loginProvider, config)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.render = function () {
        return h("div", null, h("h2", null, "Login to your Provider"), h("solid-provider-select", null), h("button", { disabled: !this.loginProvider, onClick: this.login.bind(this) }, "Login"));
    };
    Object.defineProperty(LoginComponent, "is", {
        get: function () { return "solid-login"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent, "properties", {
        get: function () {
            return {
                "callback": {
                    "type": String,
                    "attr": "callback"
                },
                "loginProvider": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent, "listeners", {
        get: function () {
            return [{
                    "name": "providerChanged",
                    "method": "providerChangedHandler"
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return LoginComponent;
}());
var store = $rdf.graph();
var fetcher = new $rdf.Fetcher(store);
var providerList = [
    {
        label: 'Inrupt',
        providerImage: '/assets/images/Inrupt.png',
        value: 'https://inrupt.net/auth',
        providerDesc: 'Lorem ipsum dolor sit amet non ipsom dolor'
    },
    {
        label: 'Solid Community',
        providerImage: '/assets/images/Solid.png',
        value: 'https://solid.community',
        providerDesc: 'Lorem ipsum dolor sit non consectetur'
    },
    {
        label: 'Other (Enter WebID)',
        providerImage: '/assets/images/Generic.png',
        value: 0
    }
];
var ProviderSelectComponent = /** @class */ (function () {
    function ProviderSelectComponent() {
    }
    ProviderSelectComponent.prototype.componentDidLoad = function () {
    };
    ProviderSelectComponent.prototype.handleChange = function (event) {
        this.selectedProvider = event.target.value;
        var provider = this.selectedProvider === 'Other (Enter WebID)' ? this.customProvider : this.selectedProvider;
        this.providerChanged.emit(provider);
    };
    ProviderSelectComponent.prototype.customProviderChanged = function () {
        this.providerChanged.emit(this.customProvider);
    };
    ProviderSelectComponent.prototype.render = function () {
        var _this = this;
        return h("div", null, h("select", { onInput: function (event) { return _this.handleChange(event); } }, h("option", { value: "undefined" }, "Select an Identity Provider"), providerList.map(function (item) { return h("option", { value: item.value || null }, item.label); })), h("div", null, this.selectedProvider === 'Other (Enter WebID)'
            ? h("input", { type: "text", class: "select-provider-text", tabindex: "0", value: this.customProvider, onBlur: function () { return _this.customProviderChanged; } })
            : h("span", null)));
    };
    Object.defineProperty(ProviderSelectComponent, "is", {
        get: function () { return "solid-provider-select"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProviderSelectComponent, "properties", {
        get: function () {
            return {
                "selectedProvider": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProviderSelectComponent, "events", {
        get: function () {
            return [{
                    "name": "providerChanged",
                    "method": "providerChanged",
                    "bubbles": true,
                    "cancelable": true,
                    "composed": true
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProviderSelectComponent, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return ProviderSelectComponent;
}());
export { LoginComponent as SolidLogin, ProviderSelectComponent as SolidProviderSelect };
