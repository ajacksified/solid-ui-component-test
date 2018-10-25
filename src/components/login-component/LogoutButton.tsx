import {Component, Prop} from "@stencil/core";
import auth from 'solid-auth-client';

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-logout-popup',
  styleUrl: 'login-component.css',
  shadow: true
})
export class LogoutButton {
  @Prop() popup: string;

  logout = async () => {
    auth.logout();
  };

  render() {
    return <button
      class="solid-auth-login"
      onClick={this.logout}>Log out</button>;
  }
}

