/*! Built with http://stenciljs.com */
const { h } = window.postcomponent;

import './chunk-04f63265.js';

/** Button that lets the user log in with Solid. */
class LoginButton {
    componentWillLoad() {
        solid.auth.trackSession(session => {
            if (session) {
                this.webId = session.webId;
            }
        });
    }
    render() {
        return (h("div", null, this.webId && this.webId !== ''
            ? h("solid-login-button", { popup: this.popup })
            : h("solid-logout-popup", null)));
    }
    static get is() { return "solid-auth"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "popup": {
            "type": String,
            "attr": "popup"
        },
        "webId": {
            "state": true
        }
    }; }
    static get style() { return ""; }
}

/** Button that lets the user log in with Solid. */
class LoginButton$1 {
    logout() {
        solid.auth.logout();
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
    static get style() { return ""; }
}

export { LoginButton as SolidAuth, LoginButton$1 as SolidLogoutPopup };
