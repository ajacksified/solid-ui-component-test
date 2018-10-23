/*! Built with http://stenciljs.com */
const { h } = window.postcomponent;

class LoginComponent {
    providerChangedHandler(event) {
        console.log(event.detail);
        this.loginProvider = event.detail;
    }
    async login() {
        if (this.loginProvider) {
            try {
                let config = {
                    storage: localStorage
                };
                if (this.callback) {
                    config.callbackUri = this.callback;
                }
                await solid.auth.login(this.loginProvider, config);
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    render() {
        return h("div", null,
            h("h2", null, "Login to your Provider"),
            h("solid-provider-select", null),
            h("button", { disabled: !this.loginProvider, onClick: this.login.bind(this) }, "Login"));
    }
    static get is() { return "solid-login"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "callback": {
            "type": String,
            "attr": "callback"
        },
        "loginProvider": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "providerChanged",
            "method": "providerChangedHandler"
        }]; }
    static get style() { return ""; }
}

// @ts-ignore
const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
const providerList = [
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
// @ts-ignore
class ProviderSelectComponent {
    componentDidLoad() {
    }
    handleChange(event) {
        this.selectedProvider = event.target.value;
        let provider = this.selectedProvider === 'Other (Enter WebID)' ? this.customProvider : this.selectedProvider;
        this.providerChanged.emit(provider);
    }
    customProviderChanged() {
        this.providerChanged.emit(this.customProvider);
    }
    //ToDo: Figure out why null value wasn't working for the "custom" provider
    render() {
        return h("div", null,
            h("select", { onInput: (event) => this.handleChange(event) },
                h("option", { value: "undefined" }, "Select an Identity Provider"),
                providerList.map((item) => h("option", { value: item.value || null }, item.label))),
            h("div", null, this.selectedProvider === 'Other (Enter WebID)'
                ? h("input", { type: "text", class: "select-provider-text", tabindex: "0", value: this.customProvider, onBlur: () => this.customProviderChanged })
                : h("span", null)));
    }
    static get is() { return "solid-provider-select"; }
    static get properties() { return {
        "selectedProvider": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "providerChanged",
            "method": "providerChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { LoginComponent as SolidLogin, ProviderSelectComponent as SolidProviderSelect };
