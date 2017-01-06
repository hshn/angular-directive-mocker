import * as angular from 'angular';
import { IRootScopeService, ICompileService, IScope } from 'angular';
import 'angular-mocks';

import { directiveMockerBuilder } from '../src';
import { testModule, Bar } from './test';

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
    visible?: boolean
  }

  let $scope: Scope, $element;
  beforeEach(() => {
    angular.mock.module(testModule.name, mocker.getModule().name);
    angular.mock.inject(($rootScope: IRootScopeService, $compile: ICompileService) => {
      $element = $compile(`
        <div>
          <foo bar="bar" ng-if="visible"></foo>
        </div>
      `)($scope = $rootScope.$new());
    });

    $scope.$digest();
  });

  describe('directive bar', () => {

    it('should be overridden', () => {
      $scope.visible = true;
      $scope.bar = {baz: 'test'};
      $scope.$digest();

      expect($element.find('bar').length).toBe(1);
      expect($element.text().trim()).toBe('bar mock');
      expect(bar().$scope.data).toEqual('test')
    });

    it('should work with ngIf', () => {
      $scope.visible = false;
      $scope.bar = {baz: 'test'};
      $scope.$digest();

      expect($element.find('bar').length).toBe(0);
      expect($element.text().trim()).toEqual('');
    });
  });
});
