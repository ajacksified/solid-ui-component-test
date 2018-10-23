import '../../stencil.core';
import 'solidAuth';
import { EventEmitter } from "../../stencil.core";
/** Button that lets the user log in with Solid. */
export declare class LogoutButton {
    popup: string;
    authenticated: EventEmitter;
    logout: () => Promise<void>;
    render(): JSX.Element;
}
