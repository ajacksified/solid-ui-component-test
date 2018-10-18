import {Component, Event, State} from '@stencil/core';
import {EventEmitter} from "@stencil/core/dist/client/declarations/stencil.core";

// @ts-ignore
declare let $rdf: any;
// @ts-ignore
const store  = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
const providerList = [
  {
    label: 'Inrupt',
    providerImage: '/assets/images/Inrupt.png',
    value: 'https://inrupt.net/auth',
    providerDesc: 'Lorem ipsum dolor sit amet non ipsom dolor'
  },
  {
    label: 'Solid Community',
    providerImage: '/assets/images/Solid.png',
    value: 'https://solid.community',
    providerDesc: 'Lorem ipsum dolor sit non consectetur'
  },
  {
    label: 'Other (Enter WebID)',
    providerImage: '/assets/images/Generic.png',
    value: 0
  }
];

// @ts-ignore

@Component({
  tag: 'solid-provider-select',
  styleUrl: 'login-component.css',
  shadow: false
})
export class ProviderSelectComponent {
  @Event() providerChanged: EventEmitter;
  @State() selectedProvider: any;
  customProvider: string;

  componentDidLoad() {

  }

  handleChange(event) {
    this.selectedProvider = event.target.value;
    let provider = this.selectedProvider === 'Other (Enter WebID)' ? this.customProvider : this.selectedProvider;

    this.providerChanged.emit(provider);
  }

  customProviderChanged() {
    this.providerChanged.emit(this.customProvider);
  }

  //ToDo: Figure out why null value wasn't working for the "custom" provider
  render() {
    return <div>
      <select onInput={(event) => this.handleChange(event)}>
        <option value="undefined">Select an Identity Provider</option>
        {providerList.map((item) =>
          <option value={item.value || null}>{item.label}</option>
        )}
      </select>
      <div>
        {this.selectedProvider === 'Other (Enter WebID)'
          ? <input type="text" class="select-provider-text" tabindex="0" value={this.customProvider} onBlur={ () => this.customProviderChanged } />
          : <span></span>
        }
      </div>
    </div>
  }

}
