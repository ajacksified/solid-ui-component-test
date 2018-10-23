import  'solidAuth';
import {Component, Prop, State} from "@stencil/core";
// @ts-ignore
declare let solid: any;

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-auth',
  styleUrl: 'login-component.css',
  shadow: true
})
export class LoginButton {
  @Prop() popup: string;
  @State() webId: string;

  componentWillLoad() {
    solid.auth.trackSession(session => {
      if(session) {
        this.webId = session.webId;
      }
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

