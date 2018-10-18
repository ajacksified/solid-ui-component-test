import {Component, Prop, State, Element, Listen} from '@stencil/core';
// @ts-ignore
declare let $rdf: any;
declare let solid: any;
// @ts-ignore
const store  = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);

// @ts-ignore

@Component({
  tag: 'solid-login',
  styleUrl: 'login-component.css',
  shadow: true
})
export class LoginComponent {
  @State() loginProvider: string;

  @Listen('providerChanged')
  providerChangedHandler(event: CustomEvent) {
    console.log(event.detail);
    this.loginProvider = event.detail;
  }

  async login() {
    if (this.loginProvider) {
      try {
        await solid.auth.login(this.loginProvider, {
          storage: localStorage
        });
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
