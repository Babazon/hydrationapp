import { action, computed, observable, reaction } from 'mobx';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Hydration extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.isLocked, this.setWaterValueToMatchHydration);
  }

  @action private setWaterValueToMatchHydration = (locked: boolean) => {
    if (locked) {
      this.dough.water.setValue(this.dough.water.waterValueToMatchTargetHydration);
    }
  }

  @observable public value: number = 75;

  @computed public get minTargetHydration(): number {
    return this.dough.userInterface.appPresets.minTargetHydration;
  }
  @computed public get maxTargetHydration(): number {
    return this.dough.userInterface.appPresets.maxTargetHydration;
  }

}
