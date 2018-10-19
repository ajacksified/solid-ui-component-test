const store = $rdf.graph();
const fetcher = new $rdf.Fetcher(store);
export class SolidFormPaneComponent {
    componentDidLoad() {
    }
    render() {
        return h("div", null);
    }
    static get is() { return "solid-form"; }
    static get style() { return "/**style-placeholder:solid-form:**/"; }
}
