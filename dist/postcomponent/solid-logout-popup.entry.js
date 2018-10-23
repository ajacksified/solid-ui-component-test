/*! Built with http://stenciljs.com */
const { h } = window.postcomponent;

import { a as auth } from './chunk-991d5e44.js';

/** Button that lets the user log in with Solid. */
class LoginButton {
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
    static get style() { return ""; }
}

export { LoginButton as SolidLogoutPopup };
