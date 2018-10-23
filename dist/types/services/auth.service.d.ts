import 'solidAuth';
export declare class AuthService {
    static isAuthenticated: () => Promise<boolean>;
    static getWebId: () => Promise<any>;
}
