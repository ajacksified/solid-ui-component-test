/*! Built with http://stenciljs.com */
const { h } = window.postcomponent;

import './chunk-04f63265.js';

class AuthService {
}
AuthService.isAuthenticated = async () => {
    const session = await solid.auth.currentSession();
    return !!session;
};
AuthService.getWebId = async () => {
    const session = await solid.auth.currentSession();
    if (!session)
        return null;
    return session.webId || null;
};

// @ts-ignore
/** Button that lets the user log in with Solid. */
class AuthenticationButton {
    async componentWillLoad() {
        this.webId = await AuthService.getWebId();
        this.popup = '/assets/popup.html';
    }
    authenticationChanged(webId) {
        console.log(webId.detail);
        this.webId = webId.detail;
    }
    render() {
        return (h("div", null, !this.webId
            ? h("solid-login-popup", { popup: this.popup })
            : h("solid-logout-popup", null)));
    }
    static get is() { return "solid-auth"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "popup": {
            "state": true
        },
        "webId": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "authenticated",
            "method": "authenticationChanged"
        }]; }
    static get style() { return ""; }
}

/** Button that lets the user log in with Solid. */
class LoginButton {
    constructor() {
        this.login = async () => {
            await solid.auth.popupLogin({ popupUri: this.popup });
            if (AuthService.isAuthenticated()) {
                const webId = await AuthService.getWebId();
                this.authenticated.emit(webId);
            }
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
    static get style() { return ""; }
}

/** Button that lets the user log in with Solid. */
class LogoutButton {
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
    static get style() { return ""; }
}

export { AuthenticationButton as SolidAuth, LoginButton as SolidLoginPopup, LogoutButton as SolidLogoutPopup };
