import 'solidAuth';
import AuthService from '../../services/auth.service';
/** Button that lets the user log in with Solid. */
export class LoginButton {
    constructor() {
        this.login = async () => {
            await AuthService.login(this.popup);
        };
    }
    render() {
        return h("button", { class: "solid-auth-login", onClick: this.login }, "Log in");
    }
    static get is() { return "solid-login-popup"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "popup": {
            "type": String,
            "attr": "popup"
        }
    }; }
    static get events() { return [{
            "name": "authenticated",
            "method": "authenticated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:solid-login-popup:**/"; }
}
