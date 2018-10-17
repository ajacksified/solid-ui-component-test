import {Component, Prop, Watch} from '@stencil/core';
// @ts-ignore
declare let $rdf: any;
// @ts-ignore
const store  = $rdf.graph();

const fetcher = new $rdf.Fetcher(store);

// @ts-ignore
const RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
const DCT = $rdf.Namespace("http://purl.org/dc/terms/");
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const SIOC = $rdf.Namespace("http://rdfs.org/sioc/ns#");

@Component({
  tag: 'post-create',
  styleUrl: 'post-component.css',
  shadow: true
})
export class PostComponent {
  @Prop() webid: string;

  updateManager = new $rdf.UpdateManager(store);
  postText: HTMLTextAreaElement;
  profile: any = {};

  constructor() {
  }

  async componentDidLoad() {
    await this.getProfile(this.webid);
    this.profile.name = store.any($rdf.sym(this.webid), VCARD('fn'));

    //TODO: This sucks
    let defaultImageUrl = window.location.protocol + '//'+ window.location.host + '/assets/images/profile.png';
    this.profile.image = store.any($rdf.sym(this.webid), VCARD('hasPhoto')) || $rdf.sym(defaultImageUrl);
  }

  render() {
    return <div class="new-post">
      <h2>Create New Post</h2>
      <form onSubmit={this.createPost} class="new-post-form">
        <textarea class="new-post-form-input" ref={(el: HTMLTextAreaElement) => this.postText = el}></textarea>
      </form>
      <div><button class="post-button" type="submit" onClick={this.createPost.bind(this)}>Create Post</button></div>
    </div>;
  }

  createPost = (event: Event) => {
    const root = this.webid.substring(0, this.webid.length-15);
    let rootDirectory = root + 'public';
    let postDirectory = rootDirectory + '/posts';
    // Step 1: Check if posts container exists
    fetch(postDirectory, {
      method: 'GET'
    }).then(async (response) => {
      if (response.status === 200) {
        await this.sendPostData(postDirectory, this.webid);
      } else if (response.status === 404) {
        await this.createFolder(rootDirectory);
        this.sendPostData(postDirectory, this.webid);
      } else {
        console.log(response.statusText);
      }
    });

  };

  getProfile = async (webId: string) => {
    return await fetcher.load(webId);
  };

  sendPostData = async (postUrl: string, webId: string) => {
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
    if(this.profile) {
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

  createFolder = (folderUrl: string) => {
    fetcher.createContainer($rdf.sym(folderUrl), 'posts');
  }
}
