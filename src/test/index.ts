import * as angular from 'angular';

export interface Bar {
  baz: string
}
class FooComponent {
  bar: Bar
}
class BarComponent {
  data: string
}

export let testModule = angular.module('app', [])
  .component('foo', {
    controller: FooComponent,
    bindings: {
      bar: '<'
    },
    template: `<bar data="$ctrl.bar.baz"></bar>`
  })
  .component('bar', {
    controller: BarComponent,
    bindings: {
      data: '<'
    },
    template: 'bar'
  })
;
