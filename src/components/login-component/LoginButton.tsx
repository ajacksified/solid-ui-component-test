import {Component,Prop} from "@stencil/core";
import auth from 'solid-auth-client';

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-login-popup',
  styleUrl: 'login-component.css',
  shadow: false
})
export class LoginButton {
  @Prop() popup: string;

  login = async() => {
    auth.popupLogin({popupUri: this.popup});
  };

  render() {
    return <button
      class="solid-auth-button"
      onClick={this.login}>Log in</button>;
  }
}
