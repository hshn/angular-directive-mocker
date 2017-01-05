import { IDirective, IModule } from 'angular';
import { DirectiveMockSupplier } from './mock-supplier';

export class DirectiveMockProvider {
  constructor(private name: string, private directive: IDirective, private mock: DirectiveMockSupplier<any>) {
  }

  provide(module: IModule): DirectiveMockSupplier<any> {
    module.directive(this.name, () => this.directive);

    return this.mock;
  }
}
