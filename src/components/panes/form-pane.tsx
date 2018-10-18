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
export class SolidPaneComponent {

  componentDidLoad() {
  }

  //ToDo: Figure out why null value wasn't working for the "custom" provider
  render() {
    return <div>

    </div>
  }

}
