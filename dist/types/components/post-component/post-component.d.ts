import '../../stencil.core';
export declare class PostComponent {
    webid: string;
    updateManager: any;
    postText: HTMLTextAreaElement;
    profile: any;
    constructor();
    componentDidLoad(): Promise<void>;
    render(): JSX.Element;
    createPost: (event: Event) => void;
    getProfile: (webId: string) => Promise<any>;
    sendPostData: (postUrl: string, webId: string) => Promise<void>;
    createFolder: (folderUrl: string) => void;
}
