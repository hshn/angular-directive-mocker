import { IScope } from 'angular';
import { DirectiveMock } from './mock';

export interface DirectiveMockSupplier<T extends IScope> {
  (): DirectiveMock<T>
}
