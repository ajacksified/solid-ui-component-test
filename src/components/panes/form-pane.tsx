import {Component, Event, State} from '@stencil/core';
//import * as UI from 'solid-ui';

// @ts-ignore
declare let $rdf: any;
//declare let UI: any;

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
    //console.log(UI.store);
  }

  render() {
    return <div>

    </div>
  }

}
