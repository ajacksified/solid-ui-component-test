import * as tslib_1 from '../polyfills/tslib.js';
/*! Built with http://stenciljs.com */
import { h } from '../postcomponent.core.js';
var store = $rdf.graph();
var fetcher = new $rdf.Fetcher(store);
var VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
var SIOC = $rdf.Namespace("http://rdfs.org/sioc/ns#");
var LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");
var PostListComponent = /** @class */ (function () {
    function PostListComponent() {
        this.postList = [];
    }
    PostListComponent.prototype.componentDidLoad = function () {
        var _this = this;
        this.postFolder = this.webid.substring(0, this.webid.length - 15) + 'public/posts/';
        fetch(this.postFolder, {
            method: 'GET'
        }).then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(response);
                        if (!(response.status === 404)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetcher.createContainer($rdf.sym(this.postFolder), 'posts')];
                    case 1:
                        _a.sent();
                        this.loadPosts();
                        return [3 /*break*/, 3];
                    case 2:
                        this.loadPosts();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    PostListComponent.prototype.loadPosts = function () {
        var _this = this;
        fetcher.load(this.postFolder, { force: true }).then(function () {
            var posts = store.each($rdf.sym(_this.postFolder), LDP('contains'));
            _this.postList = [];
            posts.forEach(function (post) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var postUrl, authorUrl, postContent, authorName, authorAvatar;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            postUrl = $rdf.sym(post.value + '#Post');
                            authorUrl = $rdf.sym(post.value + '#author');
                            return [4 /*yield*/, fetcher.load(postUrl)];
                        case 1:
                            _a.sent();
                            postContent = store.any(postUrl, SIOC('content'));
                            return [4 /*yield*/, fetcher.load(authorUrl)];
                        case 2:
                            _a.sent();
                            authorName = store.any(authorUrl, VCARD('fn'));
                            authorAvatar = store.any(authorUrl, SIOC('avatar'));
                            this.postList = this.postList.concat([{
                                    name: authorName.value,
                                    image: authorAvatar.value,
                                    content: postContent.value
                                }]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    PostListComponent.prototype.render = function () {
        return h("div", { class: "post-list" }, h("button", { onClick: this.loadPosts.bind(this), class: "post-button" }, "Refresh"), h("h3", null, "List of posts"), this.postList.map(function (post) { return h("div", { class: "post-list-item" }, h("div", { class: "post-list-item-name" }, post.name), h("div", { class: "post-list-item-image" }, h("img", { src: post.image, class: "profile-image" })), h("div", { class: "post-list-item-text" }, post.content)); }));
    };
    Object.defineProperty(PostListComponent, "is", {
        get: function () { return "post-list"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostListComponent, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostListComponent, "properties", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostListComponent, "style", {
        get: function () { return ".profile-image.sc-post-list{width:50px}.new-post.sc-post-list{max-width:200px;position:absolute;margin-left:10px}.new-post.sc-post-list   h2.sc-post-list{color:#555;margin-bottom:6px}.new-post-form-input.sc-post-list{width:200px;height:50px;border-radius:8px;margin-top:10px;border-color:#ccc}.post-list.sc-post-list{margin:10px;color:#555;font-family:sans-serif}.post-list.sc-post-list   h3.sc-post-list{text-decoration:underline;text-transform:uppercase;font-size:18px}.post-list-item.sc-post-list{width:400px;height:100px;overflow:auto;border:1px solid #ccc;padding:4px;margin-bottom:12px}.post-list-item-name.sc-post-list{font-size:16px;margin:8px 4px}.post-list-item-image.sc-post-list{float:left;margin-right:14px;margin-left:10px}.post-list-item-text.sc-post-list{font-size:12px;color:#333}.post-button.sc-post-list{background-color:#7c4dff;color:#fff;padding:6px 24px;cursor:pointer;border-radius:14px;margin-top:4px}"; },
        enumerable: true,
        configurable: true
    });
    return PostListComponent;
}());
export { PostListComponent as PostList };
