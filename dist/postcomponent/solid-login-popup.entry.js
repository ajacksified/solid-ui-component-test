/*! Built with http://stenciljs.com */
const { h } = window.postcomponent;

import { a as auth } from './chunk-991d5e44.js';

/** Button that lets the user log in with Solid. */
class LoginButton {
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
    static get style() { return ""; }
}

export { LoginButton as SolidLoginPopup };
