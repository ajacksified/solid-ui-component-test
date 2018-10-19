/*! Built with http://stenciljs.com */
import { h } from '../postcomponent.core.js';
var store = $rdf.graph();
var fetcher = new $rdf.Fetcher(store);
var SolidFormPaneComponent = /** @class */ (function () {
    function SolidFormPaneComponent() {
    }
    SolidFormPaneComponent.prototype.componentDidLoad = function () {
    };
    SolidFormPaneComponent.prototype.render = function () {
        return h("div", null);
    };
    Object.defineProperty(SolidFormPaneComponent, "is", {
        get: function () { return "solid-form"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SolidFormPaneComponent, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return SolidFormPaneComponent;
}());
export { SolidFormPaneComponent as SolidForm };
