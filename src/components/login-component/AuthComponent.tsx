import {Component, EventEmitter, Listen, State, Event} from "@stencil/core";
import AuthService from '../../services/auth.service';
// @ts-ignore

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-auth',
  styleUrl: 'login-component.css',
  shadow: true
})
export class AuthenticationButton {
  @State() popup: string;
  @State() webId: string;

  async componentWillLoad() {
     this.webId = await AuthService.getWebId();
     this.popup = '/assets/popup.html';

     //If there's a webID, we logged in. If there's not a webID, we logged out.
     AuthService._authentication.subscribe((pos) => {
       this.webId = pos ? pos.webId : null;
     })
  }

  render() {
    return (
      <div>
        { !this.webId
          ? <solid-login-popup popup={this.popup}></solid-login-popup>
          : <solid-logout-popup></solid-logout-popup>
        }
      </div>
    );
  }
}

