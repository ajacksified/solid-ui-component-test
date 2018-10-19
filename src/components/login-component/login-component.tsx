import {Component, Prop, State, Element, Listen} from '@stencil/core';
//import auth from 'solid-auth-client';
// @ts-ignore
declare let solid: any;


@Component({
  tag: 'solid-login',
  styleUrl: 'login-component.css',
  shadow: true
})
export class LoginComponent {
  @State() loginProvider: string;
  @Prop() callback: string;

  @Listen('providerChanged')
  providerChangedHandler(event: CustomEvent) {
    console.log(event.detail);
    this.loginProvider = event.detail;
  }

  async login() {
    if (this.loginProvider) {
      try {
        let config: any = {
          storage: localStorage
        };

        if(this.callback) {
          config.callbackUri = this.callback;
        }
        await solid.auth.login(this.loginProvider, config);
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    return <div>
      <h2>Login to your Provider</h2>
      <solid-provider-select></solid-provider-select>
      <button disabled={!this.loginProvider} onClick={this.login.bind(this)}>Login</button>
    </div>
  }
}
