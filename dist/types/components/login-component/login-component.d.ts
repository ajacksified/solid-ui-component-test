import '../../stencil.core';
export declare class LoginComponent {
    loginProvider: string;
    callback: string;
    providerChangedHandler(event: CustomEvent): void;
    login(): Promise<void>;
    render(): JSX.Element;
}
