import * as angular from 'angular';
import { DirectiveMockerBuilder } from './mocker-builder';

export function directiveMockerBuilder(name: string = 'mockModule' + Math.random() * 100) {
  return new DirectiveMockerBuilder(angular.module(name, []));
}
