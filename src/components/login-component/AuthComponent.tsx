import {Component, State, Prop} from "@stencil/core";
import WebIdService from '../../services/webId.service';
// @ts-ignore

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-auth',
  styleUrl: 'login-component.css',
  shadow: true
})
export class AuthenticationButton {
  @Prop() popup: string;
  @State() webId: string;

  componentWillLoad() {
    WebIdService.track(this);
  }

  componentDidUnload() {
    WebIdService.untrack(this);
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

