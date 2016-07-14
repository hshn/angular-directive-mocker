import IScope = angular.IScope;

export class DirectiveMock<T extends IScope> {
  constructor(public $scope: T) {}
}
