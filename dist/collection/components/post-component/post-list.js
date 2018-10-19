const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const SIOC = $rdf.Namespace("http://rdfs.org/sioc/ns#");
const LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");
export class PostListComponent {
    constructor() {
        this.postList = [];
    }
    componentDidLoad() {
        this.postFolder = this.webid.substring(0, this.webid.length - 15) + 'public/posts/';
        fetch(this.postFolder, {
            method: 'GET'
        }).then(async (response) => {
            console.log(response);
            if (response.status === 404) {
                await fetcher.createContainer($rdf.sym(this.postFolder), 'posts');
                this.loadPosts();
            }
            else {
                this.loadPosts();
            }
        });
    }
    loadPosts() {
        fetcher.load(this.postFolder, { force: true }).then(() => {
            let posts = store.each($rdf.sym(this.postFolder), LDP('contains'));
            this.postList = [];
            posts.forEach(async (post) => {
                let postUrl = $rdf.sym(post.value + '#Post');
                let authorUrl = $rdf.sym(post.value + '#author');
                await fetcher.load(postUrl);
                let postContent = store.any(postUrl, SIOC('content'));
                await fetcher.load(authorUrl);
                let authorName = store.any(authorUrl, VCARD('fn'));
                let authorAvatar = store.any(authorUrl, SIOC('avatar'));
                this.postList = [...this.postList, {
                        name: authorName.value,
                        image: authorAvatar.value,
                        content: postContent.value
                    }];
            });
        });
    }
    render() {
        return h("div", { class: "post-list" },
            h("button", { onClick: this.loadPosts.bind(this), class: "post-button" }, "Refresh"),
            h("h3", null, "List of posts"),
            this.postList.map((post) => h("div", { class: "post-list-item" },
                h("div", { class: "post-list-item-name" }, post.name),
                h("div", { class: "post-list-item-image" },
                    h("img", { src: post.image, class: "profile-image" })),
                h("div", { class: "post-list-item-text" }, post.content))));
    }
    static get is() { return "post-list"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "postList": {
            "state": true
        },
        "webid": {
            "type": String,
            "attr": "webid"
        }
    }; }
    static get style() { return "/**style-placeholder:post-list:**/"; }
}
