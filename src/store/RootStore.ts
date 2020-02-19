import { observable } from 'mobx';
import { Dough } from './Dough/Dough';

export class RootStore {
  constructor(public readonly appPresets: any) {
  }

  @observable public dough: Dough = new Dough(this.appPresets);

}

export const createRootStore = (envPresets: any): RootStore => {
  const root = new RootStore(envPresets);
  root.dough = new Dough(root.appPresets);
  return root;
};
