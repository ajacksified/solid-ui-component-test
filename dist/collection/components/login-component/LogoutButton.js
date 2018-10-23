import auth from 'solid-auth-client';
/** Button that lets the user log in with Solid. */
export class LoginButton {
    logout() {
        auth.logout();
    }
    render() {
        return h("button", { class: "solid-auth-login", onClick: this.logout }, "Log in");
    }
    static get is() { return "solid-logout-popup"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "popup": {
            "type": String,
            "attr": "popup"
        }
    }; }
    static get style() { return "/**style-placeholder:solid-logout-popup:**/"; }
}
