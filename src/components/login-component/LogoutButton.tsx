import auth from 'solid-auth-client';
import {Component, Prop} from "@stencil/core";

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-logout-popup',
  styleUrl: 'login-component.css',
  shadow: true
})
export class LoginButton {
  @Prop() popup: string;

  logout() {
    auth.logout();
  }

  render() {
    return <button
      class="solid-auth-login"
      onClick={this.logout}>Log in</button>;
  }
}

