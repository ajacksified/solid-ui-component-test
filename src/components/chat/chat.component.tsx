import {Component, State, Prop} from "@stencil/core";
import WebIdService from '../../services/webId.service';

declare let $rdf: any;
const store  = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
const FLOW = new $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
const FOAF = new $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const SIOC = $rdf.Namespace('http://rdfs.org/sioc/ns#');
const TERMS = $rdf.Namespace('http://purl.org/dc/terms/');
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');

@Component({
  tag: 'solid-chat',
  styleUrl: './chat.component.css',
  shadow: false
})
export class ChatComponent {
  @Prop() channel: string;
  @State() webId: string;
  @State() displayChats: any[] = [];

  chats: any[];

  componentWillLoad() {
    WebIdService.track(this);
    this.displayChats = [];

    if (this.channel) {
      const chatDate = new Date();
      const year = chatDate.getFullYear();
      const month = chatDate.getMonth() + 1; // javascript month starts at 0
      const date = chatDate.getDate();
      const startChannel = this.channel + year + '/' + month + '/' + date + '/chat.ttl';

      //https://team.inrupt.net//chats/General%20Team%20Discussion/index.ttl

      fetcher.load(startChannel).then(() => {
        this.chats = store.match(null, FLOW('message'));

        if(this.chats.length > 0) {
          this.chats.forEach(async (chat) => {
            let messageLink = $rdf.sym(chat.object.value);
            let author: any;
            let authorLink: string;
            let timestamp: string;
            let content: string;

            await fetcher.load(messageLink);
            content = store.any(messageLink, SIOC('content')).value;
            timestamp = new Date(store.any(messageLink, TERMS('created')).value).toDateString();
            authorLink = store.any(messageLink, FOAF('maker')).value; //we need to use this as a string for links later
            let authorRdfLink = $rdf.sym(authorLink); //we need to use this as a rdf link later

            await fetcher.load(authorRdfLink);

            author = store.any(authorRdfLink, VCARD('fn'));
            author = author ? author.value : '';
            // Add item to the array in a way that refreshes the render
            this.displayChats = [
              ...this.displayChats,
              {
                author: author,
                authorLink: authorLink,
                timestamp: timestamp,
                content: content
              }
            ];

          })
        }

      });
    }
  }

  componentDidUnload() {
    WebIdService.untrack(this);
  }

  render() {
    return (
      <div>
        { !this.webId
          ? <solid-login></solid-login>
          : <div>
            <h2>Chats</h2>
            {this.displayChats.map((chat) =>
              <div class="solid-chat-item">
                <a href={chat.authorLink}><span class="solid-chat-item-author">{chat.author}</span></a>
                <span class="solid-chat-item-time">{chat.timestamp}</span>
                <span class="solid-chat-item-content">{chat.content}</span>
              </div>
            )}
          </div>
        }
      </div>
    );
  }
}

