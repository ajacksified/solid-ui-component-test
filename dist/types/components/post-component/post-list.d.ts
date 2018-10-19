import '../../stencil.core';
export declare class PostListComponent {
    webid: string;
    postList: Array<any>;
    el: HTMLStencilElement;
    postFolder: string;
    componentDidLoad(): void;
    loadPosts(): void;
    render(): JSX.Element;
}
