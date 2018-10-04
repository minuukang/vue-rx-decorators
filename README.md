# vue-rx-decorators

Binding helpers for [vue-rx](https://github.com/vuejs/vue-rx).

## Dependencies
* [Vue](https://github.com/vuejs/vue)
* [rxjs](https://github.com/ReactiveX/rxjs)
* [vue-class-component](https://github.com/vuejs/vue-class-component)
* [vue-rx](https://github.com/vuejs/vue-rx)

## Installation
```
$ npm install --save vue-rx-decorators
# or
$ yarn add vue-rx-decorators
```

## Example (use `subscription`)
```vue
<template>
  <div>
    <p>counter: {{ countValue }}</p>
    <p><button v-stream:click="counter$">Add count</button></p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Observable } from 'rxjs'
import { startWith, map, scan } from 'rxjs/operators'
import { DOMStream, Subscription, DOMStreamObservable } from 'vue-rx-decorators'

@Component({
  name: 'app'
})
export default class App extends Vue {
  @DOMStream()
  private counter$!: DOMStreamObservable<MouseEvent>;
  // use property to use type in your code
  // !doesnt use arrow function (() => {}) in this callback!
  @Subscription(function () {
    return this.counter$.pipe(
      map(() => 1),
      startWith(0),
      scan((result, value) => result + value)
    )
  })
  protected countValue: number
  // old version (0.0.4 < version) use method or computed.
  // you can't use type in your code
  @Subscription()
  protected get countValueOld () {
    return this.counter$.pipe(
      map(() => 1),
      startWith(0),
      scan((result, value) => result + value)
    )
  }
}
</script>
```

## Example (use `domstreams`)
```vue
<template>
  <div>
    <p>counter: {{ countValue }}</p>
    <p><button v-stream:click="counter$">Add count</button></p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Observable } from 'rxjs'
import { startWith, map, scan } from 'rxjs/operators'
import { DOMStream, Subscription } from 'vue-rx-decorators'

@Component({
  name: 'app'
})
export default class App extends Vue {
  @DOMStream()
  private counter$: DOMStreamObservable<MouseEvent>;
  @Subscription(function () {
    return this.counter$.pipe(
      map(() => 1),
      startWith(0),
      scan((result, value) => result + value)
    )
  })
  protected countValue: number
}
</script> 
```

## Example (use `observableMethods`)
```vue
<template>
  <div>
    <p>counter: {{ countValue }}</p>
    <p><button @click="addCount">Add count</button></p>
    <p><button @click="diffCount">Diff count</button></p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { startWith, scan } from 'rxjs/operators'
import { Subscription, ObservableMethod } from 'vue-rx-decorators'

@Component({
  name: 'app'
})
export default class App extends Vue {
  @ObservableMethod()
  private counter: ObservableMethod;
  @Subscription(function () {
    return this.counter$.pipe(
      map(() => 1),
      startWith(0),
      scan((result, value) => result + value)
    )
  })
  protected countValue: number
  addCount () {
    this.counter(1)
  }
  diffCount () {
    this.counter(-1)
  }
}
</script> 
```

## License
MIT