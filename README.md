angular-directive-mocker
===============

`angular-directive-mocker` is a simple AngularJS directive/component mocking helper.

[functional test source code here](https://github.com/hshn/angular-directive-mocker/tree/master/test/index.spec.ts)

# Usage

## Install

```bash
$ npm install angular-directive-mocker --save-dev
```

## Mocking directives/components

### Define mocks

```js
import { directiveMockerBuilder } from '../src';

let mocker = directiveMockerBuilder()
  .directive('bar', {
    restrict: 'E',
    scope: {
      data: '='
    },
    template: 'bar mock'
  })
  .get();
```

### Getting mocks

```js
interface BarScope extends IScope {
  data: string
}

let bar = mocker.mock<BarScope>('bar');
```

### Bootstrap mocking module with application module

```js
angular.mock.module('app', mocker.getModule().name);
```

### Refer mock data

```
let bar = mocker.mock<BarScope>('bar');

bar().$scope; // `$scope` of bar directive/component
```
