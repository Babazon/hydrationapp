import { computed, observable, reaction } from 'mobx';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Flour extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.weight, (_) => {
      if (dough.hydration.targetHydration && dough.hydration.targetHydrationLocked) {
        dough.water.setWeight(dough.water.waterWeightToMatchTargetHydration);
      }
    });
  }

  @observable public weight: number = 1000;

  @computed public get flourWeightToMatchTargetHydration(): number {
    if (this.dough.water.weight != null &&
      this.dough.leaven.weight != null &&
      this.dough.leaven.leavenHydration != null) {
      return ((this.dough.totalWater / this.dough.hydration.targetHydration) * 100) - this.dough.leaven.leavenFlour;
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
