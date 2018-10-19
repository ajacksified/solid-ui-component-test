import auth from 'solid-auth-client';
export class LoginButton {
    render() {
        return h("button", { class: "solid-auth-login", onClick: () => auth.popupLogin({ popupUri: this.popup }) }, "Log in");
    }
    static get is() { return "solid-login-popup"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "popup": {
            "type": String,
            "attr": "popup"
        }
    }; }
    static get style() { return "/**style-placeholder:solid-login-popup:**/"; }
}