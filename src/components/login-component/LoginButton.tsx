import auth from 'solid-auth-client';
import {Component, Prop} from "@stencil/core";

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-login-popup',
  styleUrl: 'login-component.css',
  shadow: true
})
export class LoginButton {
  @Prop() popup: string;

  render() {
    return <button
      class="solid-auth-login"
      onClick={() => auth.popupLogin({ popupUri: this.popup })}>Log in</button>;
  }
}

