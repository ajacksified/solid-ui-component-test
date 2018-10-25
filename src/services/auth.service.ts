import {BehaviorSubject, from, Observable} from 'rxjs';
import auth from 'solid-auth-client';

class AuthService {

  public _authentication: BehaviorSubject<any>;

  constructor() {
    //Initialize authentication observable with default value
    this._authentication = new BehaviorSubject(0);
  }

  public isAuthenticated = async () => {
    const session = await auth.currentSession();
    return !!session;
  };

  public getWebId = async () => {
    const session = await auth.currentSession();
    if(!session) return null;
    return session.webId || null;
  };

  public async login (popup) {
    let value = await auth.popupLogin({popupUri: popup});
    console.log(value);
    this._authentication.next(value);
  };

  public logout = async() => {
    await auth.logout();
    this._authentication.next(null);
  };
}

export default new AuthService();
