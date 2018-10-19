import * as tslib_1 from '../polyfills/tslib.js';
/*! Built with http://stenciljs.com */
import { h } from '../postcomponent.core.js';
var store = $rdf.graph();
var fetcher = new $rdf.Fetcher(store);
var RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
var DCT = $rdf.Namespace("http://purl.org/dc/terms/");
var VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
var SIOC = $rdf.Namespace("http://rdfs.org/sioc/ns#");
var PostComponent = /** @class */ (function () {
    function PostComponent() {
        var _this = this;
        this.updateManager = new $rdf.UpdateManager(store);
        this.profile = {};
        this.createPost = function (event) {
            var root = _this.webid.substring(0, _this.webid.length - 15);
            var rootDirectory = root + 'public';
            var postDirectory = rootDirectory + '/posts';
            fetch(postDirectory, {
                method: 'GET'
            }).then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(response.status === 200)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sendPostData(postDirectory, this.webid)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 2:
                            if (!(response.status === 404)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.createFolder(rootDirectory)];
                        case 3:
                            _a.sent();
                            this.sendPostData(postDirectory, this.webid);
                            return [3 /*break*/, 5];
                        case 4:
                            console.log(response.statusText);
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
        };
        this.getProfile = function (webId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetcher.load(webId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.sendPostData = function (postUrl, webId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var postData, postId, postPath, authorLink, newPostUrl, why, uniquePostIdentifier;
            return tslib_1.__generator(this, function (_a) {
                postData = [];
                postId = Date.now().toString();
                postPath = postUrl + '/' + postId;
                authorLink = $rdf.sym(postPath + '#author');
                newPostUrl = $rdf.sym(postPath + '#Post');
                why = $rdf.sym(postUrl);
                uniquePostIdentifier = $rdf.sym(postPath);
                postData.push($rdf.st(newPostUrl, RDF('type'), SIOC('Post'), why));
                postData.push($rdf.st(newPostUrl, SIOC('content'), $rdf.lit(this.postText.value.trim()), why));
                postData.push($rdf.st(newPostUrl, SIOC('has_creator'), authorLink, why));
                postData.push($rdf.st(newPostUrl, DCT('created'), $rdf.lit(new Date()), why));
                console.log(this.profile);
                if (this.profile) {
                    console.log('New author info');
                    postData.push($rdf.st(authorLink, VCARD('fn'), $rdf.lit(this.profile.name)));
                    postData.push($rdf.st(authorLink, SIOC('avatar'), $rdf.sym(this.profile.image)));
                    postData.push($rdf.st(authorLink, SIOC('account_of'), $rdf.sym(this.webid)));
                }
                this.updateManager.put(uniquePostIdentifier, postData, 'text/turtle', function (response, success, message) {
                    if (success) {
                        console.log('Success!');
                    }
                    else {
                        console.log('Error!');
                        console.log(message);
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.createFolder = function (folderUrl) {
            fetcher.createContainer($rdf.sym(folderUrl), 'posts');
        };
    }
    PostComponent.prototype.componentDidLoad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var defaultImageUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProfile(this.webid)];
                    case 1:
                        _a.sent();
                        this.profile.name = store.any($rdf.sym(this.webid), VCARD('fn'));
                        defaultImageUrl = window.location.protocol + '//' + window.location.host + '/assets/images/profile.png';
                        this.profile.image = store.any($rdf.sym(this.webid), VCARD('hasPhoto')) || $rdf.sym(defaultImageUrl);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostComponent.prototype.render = function () {
        var _this = this;
        return h("div", { class: "new-post" }, h("h2", null, "Create New Post"), h("form", { onSubmit: this.createPost, class: "new-post-form" }, h("textarea", { class: "new-post-form-input", ref: function (el) { return _this.postText = el; } })), h("div", null, h("button", { class: "post-button", type: "submit", onClick: this.createPost.bind(this) }, "Create Post")));
    };
    Object.defineProperty(PostComponent, "is", {
        get: function () { return "post-create"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostComponent, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostComponent, "properties", {
        get: function () {
            return {
                "webid": {
                    "type": String,
                    "attr": "webid"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostComponent, "style", {
        get: function () { return ".profile-image.sc-post-create{width:50px}.new-post.sc-post-create{max-width:200px;position:absolute;margin-left:10px}.new-post.sc-post-create   h2.sc-post-create{color:#555;margin-bottom:6px}.new-post-form-input.sc-post-create{width:200px;height:50px;border-radius:8px;margin-top:10px;border-color:#ccc}.post-list.sc-post-create{margin:10px;color:#555;font-family:sans-serif}.post-list.sc-post-create   h3.sc-post-create{text-decoration:underline;text-transform:uppercase;font-size:18px}.post-list-item.sc-post-create{width:400px;height:100px;overflow:auto;border:1px solid #ccc;padding:4px;margin-bottom:12px}.post-list-item-name.sc-post-create{font-size:16px;margin:8px 4px}.post-list-item-image.sc-post-create{float:left;margin-right:14px;margin-left:10px}.post-list-item-text.sc-post-create{font-size:12px;color:#333}.post-button.sc-post-create{background-color:#7c4dff;color:#fff;padding:6px 24px;cursor:pointer;border-radius:14px;margin-top:4px}"; },
        enumerable: true,
        configurable: true
    });
    return PostComponent;
}());
export { PostComponent as PostCreate };
