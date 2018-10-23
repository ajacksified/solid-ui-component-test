import '../../stencil.core';
import 'solidAuth';
export declare class LoginComponent {
    loginProvider: string;
    callback: string;
    providerChangedHandler(event: CustomEvent): void;
    login(): Promise<void>;
    render(): JSX.Element;
}
