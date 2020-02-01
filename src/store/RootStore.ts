import { observable } from 'mobx';
import { presets } from '../env';
import { Dough } from './Dough';

export class RootStore {
  constructor(protected readonly appPresets: any) {
  }

  @observable public dough: Dough = new Dough(this.appPresets);

}

export default new RootStore(presets);
