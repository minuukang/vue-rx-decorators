"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_class_component_1 = require("vue-class-component");
function DOMStream() {
    return vue_class_component_1.createDecorator(function (options, key) {
        options.domStreams = options.domStreams || [];
        options.domStreams.push(key);
    });
}
exports.DOMStream = DOMStream;
function createVueSubscriptions(options) {
    if (!options.__subscriptions) {
        options.__subscriptions = {};
        options.subscriptions = function () {
            var _this = this;
            return Object.keys(options.__subscriptions).reduce(function (result, key) {
                var _a;
                return __assign({}, result, (_a = {}, _a[key] = options.__subscriptions[key].call(_this), _a));
            }, {});
        };
    }
    return options.__subscriptions;
}
function ObservableMethod() {
    return vue_class_component_1.createDecorator(function (options, key) {
        (options.observableMethods || (options.observableMethods = {}))[key] = key;
    });
}
exports.ObservableMethod = ObservableMethod;
function Subscription() {
    return vue_class_component_1.createDecorator(function (options, key) {
        var method = options.methods[key];
        delete options.methods[key];
        createVueSubscriptions(options)[key] = method;
    });
}
exports.Subscription = Subscription;
