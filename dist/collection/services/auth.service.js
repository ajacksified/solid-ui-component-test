import 'solidAuth';
import { BehaviorSubject } from 'rxjs';
class AuthService {
    constructor() {
        this.isAuthenticated = async () => {
            const session = await solid.auth.currentSession();
            return !!session;
        };
        this.getWebId = async () => {
            const session = await solid.auth.currentSession();
            if (!session)
                return null;
            return session.webId || null;
        };
        this.logout = async () => {
            await solid.auth.logout();
            this._authentication.next(null);
        };
        //Initialize authentication observable with default value
        this._authentication = new BehaviorSubject(0);
    }
    async login(popup) {
        let value = await solid.auth.popupLogin({ popupUri: popup });
        console.log(value);
        this._authentication.next(value);
    }
    ;
}
export default new AuthService();
