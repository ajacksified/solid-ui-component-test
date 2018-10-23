import 'solidAuth';
export class AuthService {
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
