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
  private counter$: Observable;
  @Subscription()
  protected get countValue () {
    return this.counter$.pipe(
      map(() => 1),
      startWith(0),
      scan((result, value) => result + value)
    )
  }
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
  @Subscription()
  protected get countValue () {
    return this.counter.pipe(
      startWith(0),
      scan((result, value) => result + value)
    )
  }
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