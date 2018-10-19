import '../../stencil.core';
import { EventEmitter } from "../../stencil.core/dist/client/declarations/stencil.core";
export declare class ProviderSelectComponent {
    providerChanged: EventEmitter;
    selectedProvider: any;
    customProvider: string;
    componentDidLoad(): void;
    handleChange(event: any): void;
    customProviderChanged(): void;
    render(): JSX.Element;
}
