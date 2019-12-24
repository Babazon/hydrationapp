import { computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Water extends Generic {
  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.value, (_: number) => {
      if (this.dough.hydration.isLocked) {
        this.dough.flour.setValue(this.dough.flour.flourValueToMatchTargetHydration);
      }
    });
  }

  @observable public value: number = presets.initialWaterValue;

  @computed public get waterValueToMatchTargetHydration(): number {
    if (
      this.dough.flour.value > 0 &&
      this.dough.leavenWeight.value > 0 &&
      this.dough.leavenHydration.value > 0) {
      return ((this.dough.hydration.value / 100) * this.dough.totalFlour) - this.dough.leavenWeight.leavenWater;
    }
    return 0;
  }

  @computed public get minWater(): number {
    return this.dough.userInterface.appPresets.minWater;
  }

  @computed public get maxWater(): number {
    return this.dough.userInterface.appPresets.maxWater;
  }

}
