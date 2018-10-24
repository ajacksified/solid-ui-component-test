import 'solidAuth';
import {BehaviorSubject, from, Observable} from 'rxjs';

declare let solid;

class AuthService {

  public _authentication: BehaviorSubject<any>;

  constructor() {
    //Initialize authentication observable with default value
    this._authentication = new BehaviorSubject(0);
  }

  public isAuthenticated = async () => {
    const session = await solid.auth.currentSession();
    return !!session;
  };

  public getWebId = async () => {
    const session = await solid.auth.currentSession();
    if(!session) return null;
    return session.webId || null;
  };

  public async login (popup) {
    let value = await solid.auth.popupLogin({popupUri: popup});
    console.log(value);
    this._authentication.next(value);
  };

  public logout = async() => {
    await solid.auth.logout();
    this._authentication.next(null);
  };
}

export default new AuthService();
