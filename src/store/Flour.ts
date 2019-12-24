import { computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Flour extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.value, (_) => {
      if (dough.hydration.value && dough.hydration.isLocked) {
        dough.water.setValue(dough.water.waterValueToMatchTargetHydration);
      }
    });
  }

  @observable public value: number = presets.initialFlourValue;

  @computed public get flourValueToMatchTargetHydration(): number {
    if (this.dough.water.value != null &&
      this.dough.leavenWeight.value != null &&
      this.dough.leavenHydration.value != null &&
      this.dough.hydration.value > 0) {
      return ((this.dough.totalWater / this.dough.hydration.value) * 100) - this.dough.leavenWeight.leavenFlour;
    }
    return 0;
  }

  @computed public get minFlour(): number {
    return this.dough.userInterface.appPresets.minFlour;
  }

  @computed public get maxFlour(): number {
    return this.dough.userInterface.appPresets.maxFlour;
  }

}
