import { DirectiveMockSupplier } from './mock-supplier';
import { DirectiveMockProvider } from './mock-provider';
import IModule = angular.IModule;
import IScope = angular.IScope;

export class DirectiveMocker {
  private mocks: {[name: string]: DirectiveMockSupplier<any>} = {};

  constructor(private module: IModule) {
  }

  addMockerProvider(name: string, mocker: DirectiveMockProvider) {
    this.mocks[name] = mocker.provide(this.module);
  }

  getModule() {
    return this.module;
  }

  mock<T extends IScope>(name: string): DirectiveMockSupplier<T> {
    if (name in this.mocks) {
      return this.mocks[name];
    }

    throw new Error(`Unknown mock "${name}" was requested.`);
  }
}
