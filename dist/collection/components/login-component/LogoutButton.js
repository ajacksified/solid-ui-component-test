import 'solidAuth';
/** Button that lets the user log in with Solid. */
export class LogoutButton {
    constructor() {
        this.logout = async () => {
            await solid.auth.logout();
            this.authenticated.emit(null);
        };
    }
    render() {
        return h("button", { class: "solid-auth-login", onClick: this.logout }, "Log out");
    }
    static get is() { return "solid-logout-popup"; }
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
    static get style() { return "/**style-placeholder:solid-logout-popup:**/"; }
}
