"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _AlbumPageView_instances, _AlbumPageView_addSubscribes, _AlbumPageView_renderComponents;
Object.defineProperty(exports, "__esModule", { value: true });
const BaseView_ts_1 = require("./BaseView.ts");
const pageNames_1 = require("../utils/config/pageNames");
const ComponentsStore_1 = __importDefault(require("../stores/ComponentsStore"));
const EventTypes_1 = require("../utils/config/EventTypes");
const componentsNames_1 = require("../utils/config/componentsNames");
const Actions_js_1 = __importDefault(require("../actions/Actions.js"));
/** Class that render Album page */
class AlbumPageView extends BaseView_ts_1.BaseView {
    /**
     * Constructor for feed page view.
     */
    constructor() {
        super(pageNames_1.pageNames.ALBUM);
        _AlbumPageView_instances.add(this);
    }
    /**
     * Render all view by components.
     */
    render() {
        super.render();
        __classPrivateFieldGet(this, _AlbumPageView_instances, "m", _AlbumPageView_addSubscribes).call(this);
        Actions_js_1.default.whatRender(super.name);
    }
}
_AlbumPageView_instances = new WeakSet(), _AlbumPageView_addSubscribes = function _AlbumPageView_addSubscribes() {
    ComponentsStore_1.default.subscribe((list) => {
        __classPrivateFieldGet(this, _AlbumPageView_instances, "m", _AlbumPageView_renderComponents).call(this, list);
    }, EventTypes_1.EventTypes.ON_NOT_RENDERED_ITEMS);
}, _AlbumPageView_renderComponents = function _AlbumPageView_renderComponents(list) {
    list.forEach((component) => {
        const componentName = component.name;
        const parent = ComponentsStore_1.default.checkWhereToPlace(componentName);
        switch (componentName) {
            case componentsNames_1.componentsNames.ALBUM:
                component.render(parent);
                Actions_js_1.default.addElementOnPage(componentName);
                break;
            default:
        }
    });
};
exports.default = new AlbumPageView();
