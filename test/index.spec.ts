import * as angular from 'angular';
import 'angular-mocks/ngMock';

import { directiveMockerBuilder } from '../src';
import { testModule, Bar } from './module';
import IRootScopeService = angular.IRootScopeService;
import ICompileService = angular.ICompileService;
import IScope = angular.IScope;

let mocker = directiveMockerBuilder()
  .directive('bar', {
    restrict: 'E',
    scope: {
      data: '='
    },
    template: 'bar mock'
  })
  .get();

interface BarScope extends IScope {
  data: string
}

let bar = mocker.mock<BarScope>('bar');

describe('directive mocker', () => {

  interface Scope extends IScope {
    bar?: Bar
  }

  let $scope: Scope, $element;
  beforeEach(() => {
    angular.mock.module(testModule.name, mocker.getModule().name);
    angular.mock.inject(($rootScope: IRootScopeService, $compile: ICompileService) => {
      $element = $compile('<foo bar="bar"></foo>')($scope = $rootScope.$new());
    });

    $scope.$digest();
  });

  describe('directive bar', () => {

    it('should be overridden', () => {

      $scope.bar = {baz: 'test'};
      $scope.$digest();

      expect($element.text()).toBe('bar mock');
      expect(bar().$scope.data).toEqual('test')
    });
  });
});
