/*! Built with http://stenciljs.com */
import { h } from '../postcomponent.core.js';

const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
class SolidFormPaneComponent {
    componentDidLoad() {
    }
    render() {
        return h("div", null);
    }
    static get is() { return "solid-form"; }
    static get style() { return ""; }
}

export { SolidFormPaneComponent as SolidForm };
