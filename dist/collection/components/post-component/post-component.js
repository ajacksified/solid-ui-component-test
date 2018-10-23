// @ts-ignore
const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
// @ts-ignore
const RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
const DCT = $rdf.Namespace("http://purl.org/dc/terms/");
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const SIOC = $rdf.Namespace("http://rdfs.org/sioc/ns#");
export class PostComponent {
    constructor() {
        this.updateManager = new $rdf.UpdateManager(store);
        this.profile = {};
        this.createPost = (event) => {
            const root = this.webid.substring(0, this.webid.length - 15);
            let rootDirectory = root + 'public';
            let postDirectory = rootDirectory + '/posts';
            // Step 1: Check if posts container exists
            fetch(postDirectory, {
                method: 'GET'
            }).then(async (response) => {
                if (response.status === 200) {
                    await this.sendPostData(postDirectory, this.webid);
                }
                else if (response.status === 404) {
                    await this.createFolder(rootDirectory);
                    this.sendPostData(postDirectory, this.webid);
                }
                else {
                    console.log(response.statusText);
                }
            });
        };
        this.getProfile = async (webId) => {
            return await fetcher.load(webId);
        };
        this.sendPostData = async (postUrl, webId) => {
            let postData = [];
            let postId = Date.now().toString();
            let postPath = postUrl + '/' + postId;
            let authorLink = $rdf.sym(postPath + '#author');
            let newPostUrl = $rdf.sym(postPath + '#Post');
            let why = $rdf.sym(postUrl);
            let uniquePostIdentifier = $rdf.sym(postPath);
            postData.push($rdf.st(newPostUrl, RDF('type'), SIOC('Post'), why));
            postData.push($rdf.st(newPostUrl, SIOC('content'), $rdf.lit(this.postText.value.trim()), why));
            postData.push($rdf.st(newPostUrl, SIOC('has_creator'), authorLink, why));
            postData.push($rdf.st(newPostUrl, DCT('created'), $rdf.lit(new Date()), why));
            //postData.push($rdf.st(uniquePostIdentifier, SIOC('Post'), newPostUrl, why));
            console.log(this.profile);
            if (this.profile) {
                console.log('New author info');
                postData.push($rdf.st(authorLink, VCARD('fn'), $rdf.lit(this.profile.name)));
                postData.push($rdf.st(authorLink, SIOC('avatar'), $rdf.sym(this.profile.image)));
                postData.push($rdf.st(authorLink, SIOC('account_of'), $rdf.sym(this.webid)));
            }
            this.updateManager.put(uniquePostIdentifier, postData, 'text/turtle', (response, success, message) => {
                if (success) {
                    console.log('Success!');
                }
                else {
                    console.log('Error!');
                    console.log(message);
                }
            });
        };
        this.createFolder = (folderUrl) => {
            fetcher.createContainer($rdf.sym(folderUrl), 'posts');
        };
    }
    async componentDidLoad() {
        await this.getProfile(this.webid);
        this.profile.name = store.any($rdf.sym(this.webid), VCARD('fn'));
        //TODO: This sucks
        let defaultImageUrl = window.location.protocol + '//' + window.location.host + '/assets/images/profile.png';
        this.profile.image = store.any($rdf.sym(this.webid), VCARD('hasPhoto')) || $rdf.sym(defaultImageUrl);
    }
    render() {
        return h("div", { class: "new-post" },
            h("h2", null, "Create New Post"),
            h("form", { onSubmit: this.createPost, class: "new-post-form" },
                h("textarea", { class: "new-post-form-input", ref: (el) => this.postText = el })),
            h("div", null,
                h("button", { class: "post-button", type: "submit", onClick: this.createPost.bind(this) }, "Create Post")));
    }
    static get is() { return "post-create"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "webid": {
            "type": String,
            "attr": "webid"
        }
    }; }
    static get style() { return "/**style-placeholder:post-create:**/"; }
}
