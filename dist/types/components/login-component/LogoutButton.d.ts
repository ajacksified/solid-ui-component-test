import '../../stencil.core';
import 'solidAuth';
/** Button that lets the user log in with Solid. */
export declare class LogoutButton {
    popup: string;
    logout: () => Promise<void>;
    render(): JSX.Element;
}
