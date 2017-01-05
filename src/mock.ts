import { IScope } from 'angular';

export class DirectiveMock<T extends IScope> {
  constructor(public $scope: T) {}
}
