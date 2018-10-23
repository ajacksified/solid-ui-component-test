/*! Built with http://stenciljs.com */
const { h } = window.postcomponent;

// @ts-ignore
const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
// @ts-ignore
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const SIOC = $rdf.Namespace("http://rdfs.org/sioc/ns#");
const LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");
class PostListComponent {
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
            //format post list
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
    static get style() { return ".profile-image {\n  width: 50px;\n}\n\n.new-post {\n  max-width: 200px;\n  position:absolute;\n  margin-left: 10px;\n}\n\n.new-post h2 {\n  color: #555;\n  margin-bottom: 6px;\n}\n\n.new-post-form-input {\n  width: 200px;\n  height: 50px;\n  border-radius: 8px;\n  margin-top: 10px;\n  border-color: #ccc;\n}\n\n.post-list {\n  margin: 10px;\n  color: #555;\n  font-family: sans-serif;\n}\n\n.post-list h3 {\n  text-decoration: underline;\n  text-transform: uppercase;\n  font-size: 18px;\n}\n\n.post-list-item {\n  width: 400px;\n  height: 100px;\n  overflow: auto;\n  border: solid 1px #ccc;\n  padding: 4px;\n  margin-bottom: 12px;\n}\n\n.post-list-item-name {\n  font-size: 16px;\n  margin: 8px 4px;\n}\n\n.post-list-item-image {\n  float: left;\n  margin-right: 14px;\n  margin-left: 10px;\n}\n\n.post-list-item-text {\n  font-size: 12px;\n  color: #333;\n}\n\n.post-button {\n  background-color: #7C4DFF;\n  color: white;\n  padding: 6px 24px;\n  cursor: pointer;\n  border-radius: 14px;\n  margin-top: 4px;\n}"; }
}

export { PostListComponent as PostList };
