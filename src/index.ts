import { createDecorator } from "vue-class-component";
import Vue from "vue";

export function DOMStream() {
  return createDecorator((options: any, key) => {
    options.domStreams = options.domStreams || [];
    options.domStreams.push(key);
  });
}

function createVueSubscriptions (options: any) {
  if (!options.__subscriptions) {
    options.__subscriptions = {};
    options.subscriptions = function(this: Vue) {
      return Object.keys(options.__subscriptions).reduce((result, key) => {
        return {
          ...result,
          [key]: options.__subscriptions[key].call(this)
        }
      }, {})
    }
  }
  return options.__subscriptions;
}

export function ObservableMethod() {
  return createDecorator((options: any, key) => {
    (options.observableMethods || (options.observableMethods = {}))[key] = key;
  });
}

export function Subscription() {
  return createDecorator((options: any, key) => {
    const method = options.methods[key];
    delete options.methods[key];
    createVueSubscriptions(options)[key] = method;
  });
}


