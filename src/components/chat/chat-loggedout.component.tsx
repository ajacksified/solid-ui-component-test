import {Component, State, Prop} from "@stencil/core";
import WebIdService from '../../services/webId.service';
// @ts-ignore

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-chat-logged-out',
  shadow: false
})
export class SolidChatLoggedOutComponent {

  componentWillLoad() {
    WebIdService.track(this);
  }

  componentDidUnload() {
    WebIdService.untrack(this);
  }

  render() {
    return (
     <div>
       <div>
          You are logged out. Please log in to continue.
       </div>
       <div>
         <solid-login></solid-login>
       </div>
     </div>
    );
  }
}

