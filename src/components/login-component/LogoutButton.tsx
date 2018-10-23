import  'solidAuth';
import {Component, EventEmitter, Prop, Event} from "@stencil/core";
import {AuthService} from "../../services/auth.service";
// @ts-ignore
declare let solid: any;

/** Button that lets the user log in with Solid. */
@Component({
  tag: 'solid-logout-popup',
  styleUrl: 'login-component.css',
  shadow: true
})
export class LogoutButton {
  @Prop() popup: string;
  @Event() authenticated: EventEmitter;

  logout = async () => {
    await solid.auth.logout();
    this.authenticated.emit(null);
  }

  render() {
    return <button
      class="solid-auth-login"
      onClick={this.logout}>Log out</button>;
  }
}

