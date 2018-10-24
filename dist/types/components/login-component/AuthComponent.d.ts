import '../../stencil.core';
import 'solidAuth';
/** Button that lets the user log in with Solid. */
export declare class AuthenticationButton {
    popup: string;
    webId: string;
    componentWillLoad(): Promise<void>;
    render(): JSX.Element;
}
