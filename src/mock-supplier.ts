import { DirectiveMock } from './mock';
import IScope = angular.IScope;

export interface DirectiveMockSupplier<T extends IScope> {
  (): DirectiveMock<T>
}
