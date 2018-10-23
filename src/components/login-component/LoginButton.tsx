import  'solidAuth'; 
import {Component, EventEmitter, Prop, Event} from "@stencil/core";
import { AuthService } from '../../services/auth.service';
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
  @Event() authenticated: EventEmitter;

  login = async() => {
    await solid.auth.popupLogin({ popupUri: this.popup });
    if(AuthService.isAuthenticated()) {
      const webId = await AuthService.getWebId();
      this.authenticated.emit(webId);
    }
  };

  render() {
    return <button
      class="solid-auth-login"
      onClick={this.login}>Log in</button>;
  }
}

