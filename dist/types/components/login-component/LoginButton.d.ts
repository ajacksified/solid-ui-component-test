import '../../stencil.core';
import 'solidAuth';
import { EventEmitter } from "../../stencil.core";
/** Button that lets the user log in with Solid. */
export declare class LoginButton {
    popup: string;
    authenticated: EventEmitter;
    login: () => Promise<void>;
    render(): JSX.Element;
}
