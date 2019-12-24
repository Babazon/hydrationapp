import { computed, observable, reaction } from 'mobx';
import { presets } from '../env';
import { Dough } from './Dough';
import { Generic } from './Generic';

export class Flour extends Generic {

  constructor(private readonly dough: Dough) {
    super();

    reaction(() => this.weight, (_) => {
      if (dough.hydration.targetHydration && dough.hydration.isLocked) {
        dough.water.setWeight(dough.water.waterWeightToMatchTargetHydration);
      }
    });
  }

  @observable public weight: number = presets.initialFlourWeight;

  @computed public get flourWeightToMatchTargetHydration(): number {
    if (this.dough.water.weight != null &&
      this.dough.leaven.weight != null &&
      this.dough.leaven.leavenHydration != null &&
      this.dough.hydration.targetHydration > 0) {
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
