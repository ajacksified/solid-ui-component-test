import {Component, Event, State} from '@stencil/core';

// @ts-ignore
declare let $rdf: any;
// @ts-ignore
const store  = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);

// @ts-ignore

@Component({
  tag: 'solid-form',
  styleUrl: 'form-pane.css',
  shadow: false
})
export class SolidFormPaneComponent {

  componentDidLoad() {
  }

  render() {
    return <div>

    </div>
  }

}
