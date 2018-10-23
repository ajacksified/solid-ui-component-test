import 'solidAuth';

declare let solid;

export class AuthService {

  public static isAuthenticated = async () => {
    const session = await solid.auth.currentSession();
    return !!session;
  }

  public static getWebId = async () => {
    const session = await solid.auth.currentSession();
    if(!session) return null;
    return session.webId || null;
  }
}
