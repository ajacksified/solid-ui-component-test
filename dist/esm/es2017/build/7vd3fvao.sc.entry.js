/*! Built with http://stenciljs.com */
import { h } from '../postcomponent.core.js';

const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
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
    static get style() { return ".profile-image.sc-post-list{width:50px}.new-post.sc-post-list{max-width:200px;position:absolute;margin-left:10px}.new-post.sc-post-list   h2.sc-post-list{color:#555;margin-bottom:6px}.new-post-form-input.sc-post-list{width:200px;height:50px;border-radius:8px;margin-top:10px;border-color:#ccc}.post-list.sc-post-list{margin:10px;color:#555;font-family:sans-serif}.post-list.sc-post-list   h3.sc-post-list{text-decoration:underline;text-transform:uppercase;font-size:18px}.post-list-item.sc-post-list{width:400px;height:100px;overflow:auto;border:1px solid #ccc;padding:4px;margin-bottom:12px}.post-list-item-name.sc-post-list{font-size:16px;margin:8px 4px}.post-list-item-image.sc-post-list{float:left;margin-right:14px;margin-left:10px}.post-list-item-text.sc-post-list{font-size:12px;color:#333}.post-button.sc-post-list{background-color:#7c4dff;color:#fff;padding:6px 24px;cursor:pointer;border-radius:14px;margin-top:4px}"; }
}

export { PostListComponent as PostList };
