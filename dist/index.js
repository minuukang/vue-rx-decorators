"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_class_component_1 = require("vue-class-component");
function DOMStream() {
    return vue_class_component_1.createDecorator((options, key) => {
        options.domStreams = options.domStreams || [];
        options.domStreams.push(key);
    });
}
exports.DOMStream = DOMStream;
function createVueSubscriptions(options) {
    if (!options.__subscriptions) {
        options.__subscriptions = {};
        options.subscriptions = function () {
            return Object.keys(options.__subscriptions).reduce((result, key) => {
                return Object.assign({}, result, { [key]: options.__subscriptions[key].call(this) });
            }, {});
        };
    }
    return options.__subscriptions;
}
function ObservableMethod() {
    return vue_class_component_1.createDecorator((options, key) => {
        (options.observableMethods || (options.observableMethods = {}))[key] = key;
    });
}
exports.ObservableMethod = ObservableMethod;
function Subscription() {
    return vue_class_component_1.createDecorator((options, key) => {
        let method;
        if (options.methods && key in options.methods) {
            method = options.methods[key];
            delete options.methods[key];
        }
        else if (options.computed && key in options.computed) {
            method = options.computed[key].get;
            delete options.computed[key];
        }
        else {
            throw new Error("vue-rx-decorators: @Subscription method will be use on method or computed.");
        }
        const subscriptions = createVueSubscriptions(options);
        subscriptions[key] = method;
    });
}
exports.Subscription = Subscription;
