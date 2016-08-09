import * as angular from 'angular';

import { DirectiveMocker } from './mocker';
import { DirectiveMock } from './mock';
import { DirectiveMockProvider } from './mock-provider';

import IDirective = angular.IDirective;
import IModule = angular.IModule;
import IScope = angular.IScope;

export class DirectiveMockerBuilder {

  private module: DirectiveMocker;

  constructor(module: IModule) {
    this.module = new DirectiveMocker(module);
  }

  directive(name: string, directive: IDirective): DirectiveMockerBuilder {
    this.module.addMockerProvider(name, mockerProvider(name, directive));

    return this;
  }

  get(): DirectiveMocker {
    return this.module
  }
}

function mockerProvider(name: string, directive: IDirective) {
  let directiveMock: DirectiveMock<any>;

  directive = angular.extend({}, {
    priority: 599,
    terminal: true,
    link: ($scope: IScope) => directiveMock = new DirectiveMock($scope)
  }, directive);

  return new DirectiveMockProvider(name, directive, () => directiveMock);
}
