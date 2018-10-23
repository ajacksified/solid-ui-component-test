import 'solidAuth';
import { AuthService } from '../../services/auth.service';
// @ts-ignore
/** Button that lets the user log in with Solid. */
export class AuthenticationButton {
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
    static get style() { return "/**style-placeholder:solid-auth:**/"; }
}
