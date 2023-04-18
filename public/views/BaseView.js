"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _BaseView_instances, _BaseView_viewName, _BaseView_addSubscribes, _BaseView_renderComponentsList, _BaseView_preRender;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseView = void 0;
const ComponentsStore_js_1 = __importDefault(require("../stores/ComponentsStore.js"));
const prePageRender_js_1 = require("../utils/functions/prePageRender.js");
const EventTypes_js_1 = require("../utils/config/EventTypes.js");
const Actions_1 = __importDefault(require("../actions/Actions"));
const componentsNames_js_1 = require("../utils/config/componentsNames.js");
/**
 * Base View class to handle render functions.
 */
class BaseView {
    /**
     * Constructor for base view.
     */
    constructor(name) {
        _BaseView_instances.add(this);
        /**
         * Name of view.
         */
        _BaseView_viewName.set(this, void 0);
        __classPrivateFieldSet(this, _BaseView_viewName, name, "f");
    }
    /**
     * Function to get view name.
     * @returns {string}
     */
    get name() {
        return __classPrivateFieldGet(this, _BaseView_viewName, "f");
    }
    /**
     * Render element in parent. Clear parent before.
     */
    render() {
        __classPrivateFieldGet(this, _BaseView_instances, "m", _BaseView_preRender).call(this);
        __classPrivateFieldGet(this, _BaseView_instances, "m", _BaseView_addSubscribes).call(this);
    }
}
exports.BaseView = BaseView;
_BaseView_viewName = new WeakMap(), _BaseView_instances = new WeakSet(), _BaseView_addSubscribes = function _BaseView_addSubscribes() {
    ComponentsStore_js_1.default.subscribe((list) => {
        __classPrivateFieldGet(this, _BaseView_instances, "m", _BaseView_renderComponentsList).call(this, list);
    }, EventTypes_js_1.EventTypes.ON_NOT_RENDERED_ITEMS);
}, _BaseView_renderComponentsList = function _BaseView_renderComponentsList(list) {
    list.forEach((component) => {
        const componentName = component.name;
        const parent = ComponentsStore_js_1.default.checkWhereToPlace(componentName);
        switch (componentName) {
            case componentsNames_js_1.componentsNames.SIDEBAR:
            case componentsNames_js_1.componentsNames.MAIN:
            case componentsNames_js_1.componentsNames.NAVBAR:
            case componentsNames_js_1.componentsNames.PAGE404:
            case componentsNames_js_1.componentsNames.PLAYER:
                component.render(parent);
                Actions_1.default.addElementOnPage(componentName);
                break;
            default:
        }
    });
}, _BaseView_preRender = function _BaseView_preRender() {
    if (ComponentsStore_js_1.default.prePageNeed()) {
        (0, prePageRender_js_1.prePageRender)();
    }
};
