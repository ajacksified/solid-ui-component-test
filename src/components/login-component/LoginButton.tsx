import  'solidAuth'; 
import {Component, Prop} from "@stencil/core";
// @ts-ignore
declare let solid: any;
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
      onClick={() => solid.auth.popupLogin({ popupUri: this.popup })}>Log in</button>;
  }
}

