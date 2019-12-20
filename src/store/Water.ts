import { computed, observable, reaction } from 'mobx';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Water extends Generic {
  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.weight, (_: number) => {
      if (this.dough.hydration.targetHydrationLocked) {
        this.dough.flour.setWeight(this.dough.flour.flourWeightToMatchTargetHydration);
      }
    });
  }

  @observable public weight: number = 725;

  @computed public get waterWeightToMatchTargetHydration(): number {
    if (
      this.dough.flour.weight != null &&
      this.dough.leaven.weight != null &&
      this.dough.leaven.leavenHydration != null) {
      return ((this.dough.hydration.targetHydration / 100) * this.dough.totalFlour) - this.dough.leaven.leavenWater;
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
