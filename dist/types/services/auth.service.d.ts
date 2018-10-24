import 'solidAuth';
import { BehaviorSubject } from 'rxjs';
declare class AuthService {
    _authentication: BehaviorSubject<any>;
    constructor();
    isAuthenticated: () => Promise<boolean>;
    getWebId: () => Promise<any>;
    login(popup: any): Promise<void>;
    logout: () => Promise<void>;
}
declare const _default: AuthService;
export default _default;
