import { observable } from 'mobx';
import { presets } from '../env';
import { Dough } from './Dough';

export class RootStore {
  constructor(protected readonly appPresets: any) {
    this.dough = new Dough(appPresets);
  }

  @observable public dough: Dough;

}

export default new RootStore(presets);
