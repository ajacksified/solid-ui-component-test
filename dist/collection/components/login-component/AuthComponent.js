import 'solidAuth';
/** Button that lets the user log in with Solid. */
export class LoginButton {
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
    static get style() { return "/**style-placeholder:solid-auth:**/"; }
}
