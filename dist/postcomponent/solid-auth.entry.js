/*! Built with http://stenciljs.com */
const { h } = window.postcomponent;

import { a as auth } from './chunk-991d5e44.js';

/** Button that lets the user log in with Solid. */
class LoginButton {
    componentWillLoad() {
        auth.trackSession(session => {
            if (session) {
                this.webId = session.webId;
            }
        });
    }
    render() {
        return (h("div", null, this.webId && this.webId !== ''
            ? h("solid-login-button", { popup: this.popup })
            : h("solid-logout-button", null)));
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

export { LoginButton as SolidAuth };
