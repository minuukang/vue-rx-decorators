import { createDecorator, VueDecorator } from "vue-class-component";
import Vue from "vue";
import { Observable } from "rxjs";

export interface ObservableMethod extends Observable<any> {
  (...args: any[]): any;
}

export function DOMStream(): VueDecorator {
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

export function ObservableMethod(): VueDecorator {
  return createDecorator((options: any, key) => {
    (options.observableMethods || (options.observableMethods = {}))[key] = key;
  });
}

export function Subscription(): VueDecorator {
  return createDecorator((options: any, key) => {
    let method: Function;
    if (key in options.methods) {
      method = options.methods[key];
      delete options.methods[key];
    } else if (key in options.computed!) {
      method = options.computed[key].get;
      delete options.computed[key];
    } else {
      throw new Error("vue-rx-decorators: @Subscription method will be use on method or computed.");
    }
    const subscriptions = createVueSubscriptions(options)
    subscriptions[key] = method;
  });
}


