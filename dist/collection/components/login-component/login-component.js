import 'solidAuth';
export class LoginComponent {
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
    static get style() { return "/**style-placeholder:solid-login:**/"; }
}
