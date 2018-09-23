import { VueDecorator } from "vue-class-component";
import { Observable } from "rxjs";
export interface ObservableMethod extends Observable<any> {
    (...args: any[]): any;
}
export declare function DOMStream(): VueDecorator;
export declare function ObservableMethod(): VueDecorator;
export declare function Subscription(): VueDecorator;
