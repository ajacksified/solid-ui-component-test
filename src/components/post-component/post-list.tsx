import {Component, Prop, State, Element} from '@stencil/core';
// @ts-ignore
declare let $rdf: any;
// @ts-ignore
const store  = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);

// @ts-ignore
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const SIOC = $rdf.Namespace("http://rdfs.org/sioc/ns#");
const LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");

@Component({
  tag: 'post-list',
  styleUrl: 'post-component.css',
  shadow: true
})
export class PostListComponent {
  @Prop() webid: string;
  @State() postList: Array<any> = [];
  @Element() el!: HTMLStencilElement;
  postFolder: string;

  componentDidLoad() {
    this.postFolder = this.webid.substring(0, this.webid.length-15) + 'public/posts/';
    fetch(this.postFolder, {
      method: 'GET'
    }).then(async (response) => {
      console.log(response);
      if (response.status === 404) {
        await fetcher.createContainer($rdf.sym(this.postFolder), 'posts');
        this.loadPosts();
      } else {
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
        let postUrl = $rdf.sym(post.value+'#Post');
        let authorUrl = $rdf.sym(post.value+'#author');

        await fetcher.load(postUrl);
        let postContent = store.any(postUrl, SIOC('content'));

        await fetcher.load(authorUrl);
        let authorName = store.any(authorUrl, VCARD('fn'));
        let authorAvatar = store.any(authorUrl, SIOC('avatar'));

        this.postList =[...this.postList, {
          name: authorName.value,
          image: authorAvatar.value,
          content: postContent.value
        }];
      });
    });
  }

  render() {
    return <div class="post-list">
      <button onClick={ this.loadPosts.bind(this) } class="post-button">Refresh</button>
      <h3>List of posts</h3>
      {this.postList.map((post) =>
        <div class="post-list-item">
          <div class="post-list-item-name">{post.name}</div>
          <div class="post-list-item-image"><img src={post.image} class="profile-image" /></div>
          <div class="post-list-item-text">{post.content}</div>
        </div>
      )}
    </div>
  }
}
