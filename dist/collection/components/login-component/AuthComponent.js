import auth from 'solid-auth-client';
/** Button that lets the user log in with Solid. */
export class LoginButton {
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
    static get style() { return "/**style-placeholder:solid-auth:**/"; }
}
