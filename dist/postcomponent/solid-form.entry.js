/*! Built with http://stenciljs.com */
const { h } = window.postcomponent;

//declare let UI: any;
// @ts-ignore
const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
// @ts-ignore
class SolidFormPaneComponent {
    componentDidLoad() {
        //console.log(UI.store);
    }
    render() {
        return h("div", null);
    }
    static get is() { return "solid-form"; }
    static get style() { return ""; }
}

export { SolidFormPaneComponent as SolidForm };
