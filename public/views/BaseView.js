"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseView = void 0;
var ComponentsStore_1 = require("../stores/ComponentsStore");
var prePageRender_1 = require("../utils/functions/prePageRender");
var EventTypes_1 = require("../utils/config/EventTypes");
var Actions_1 = require("../actions/Actions");
var componentsNames_1 = require("../utils/config/componentsNames");
/**
 * Base View class to handle render functions.
 */
var BaseView = /** @class */ (function () {
    /**
     * Constructor for base view.
     */
    function BaseView(name) {
        this.viewName = name;
    }
    Object.defineProperty(BaseView.prototype, "name", {
        /**
         * Function to get view name.
         * @returns {string}
         */
        get: function () {
            return this.viewName;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Function to make all basic subscribes
     */
    BaseView.prototype.addSubscribes = function () {
        var _this = this;
        ComponentsStore_1.default.subscribe(function (list) {
            _this.renderComponentsList(list);
        }, EventTypes_1.EventTypes.ON_NOT_RENDERED_ITEMS);
    };
    /**
     * Callback to pass throw store to subscribe rendering components.
     * @param list
     */
    BaseView.prototype.renderComponentsList = function (list) {
        list.forEach(function (component) {
            var componentName = component.name;
            var parent = ComponentsStore_1.default.checkWhereToPlace(componentName);
            switch (componentName) {
                case componentsNames_1.componentsNames.SIDEBAR:
                case componentsNames_1.componentsNames.MAIN:
                case componentsNames_1.componentsNames.NAVBAR:
                case componentsNames_1.componentsNames.PAGE404:
                case componentsNames_1.componentsNames.PLAYER:
                    component.render(parent);
                    Actions_1.default.addElementOnPage(componentName);
                    break;
                default:
            }
        });
    };
    /**
     * Some logic before render.
     */
    BaseView.prototype.preRender = function () {
        if (ComponentsStore_1.default.prePageNeed()) {
            (0, prePageRender_1.prePageRender)();
        }
    };
    /**
     * Render element in parent. Clear parent before.
     */
    BaseView.prototype.render = function () {
        this.preRender();
        this.addSubscribes();
    };
    return BaseView;
}());
exports.BaseView = BaseView;
